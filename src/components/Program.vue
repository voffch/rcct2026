<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import Filter from './Filter.vue';
import EventCard from './EventCard.vue';
import prog from './prog.json';
import { tr, defaultFilter } from './helpers.js';
import { usePolling } from './usePolling.js';

const props = defineProps({
  lang: {
    type: String,
    default: 'en'
  }
});

function explainSection(sectionTitle) {
  return tr.sectionNames[props.lang][sectionTitle] ?? sectionTitle;
}

const localStorageFilterName = 'rcct2026-filter-settings';
const localStorageCheckedPresentations = 'rcct2026-checked-presentations';

const filter = ref(structuredClone(defaultFilter));

const checkedPresentations = ref(new Set());

onMounted(() => {
  const storedFilter = localStorage.getItem(localStorageFilterName);
  if (storedFilter) {
    try {
      filter.value = {...structuredClone(defaultFilter), ...JSON.parse(storedFilter)};
    } catch (e) {
      console.error('Error while parsing stored filter, using defaults: ', e);
      filter.value = structuredClone(defaultFilter);
    }
  }
  const storedChecked = localStorage.getItem(localStorageCheckedPresentations);
  if (storedChecked) {
    try {
      const restoredCheckedArray = JSON.parse(storedChecked);
      checkedPresentations.value = new Set(restoredCheckedArray);
    } catch (e) {
      console.error('Error while parsing stored checked presentations, using defaults: ', e);
      checkedPresentations.value = new Set();
    }
  }
  const url = new URL(window.location.href);
  const checkedStr = url.searchParams.get('checked');
  if (checkedStr) {
    try {
      const allIds = new Set(prog.map(p => p.id));
      const checkedArray = JSON.parse(checkedStr)?.filter(id => allIds.has(id));
      checkedPresentations.value = new Set(checkedArray);
    } catch (e) {
      console.error('Error while parsing checked presentations from URL: ', e);
    } finally {
      url.searchParams.delete('checked');
      window.history.replaceState({}, '', url);
    }
  }
});

watch(filter, 
  (newVal) => {
    localStorage.setItem(localStorageFilterName, JSON.stringify(newVal))
  }, { deep: true }
);

watch(checkedPresentations,
  (newVal) => {
    localStorage.setItem(localStorageCheckedPresentations, JSON.stringify(Array.from(newVal)));
  }, { deep: true }
);

const handleCheckEventCard = (id) => {
  if (checkedPresentations.value.has(id)) {
    checkedPresentations.value.delete(id);
  } else {
    checkedPresentations.value.add(id);
  }
}

function htmlToPlaintext(htmlString) {
  return htmlString
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

const sortedProg = ref(prog.sort((a, b) => {
  if (a.start !== b.start) {
    return a.start < b.start ? -1 : 1;
  } else { //assume poster
    const aNum = a.poster_number ?? 0;
    const bNum = b.poster_number ?? 0;
    return aNum - bNum;
  }
}));
sortedProg.value.forEach(event => {
  const match = event.authors.match(/<u>(.*?)<\/u>/);
  event.presenter = match ? match[1] : event.authors;
  event.textToSearch = htmlToPlaintext(event.title).toLowerCase() + 
                       htmlToPlaintext(event.authors).toLowerCase() + 
                       (event.title_ru ? htmlToPlaintext(event.title_ru).toLowerCase() : '');
  event.day = event.start.split('T')[0];
});

const filteredProg = computed(() => {
  const searchString = filter.value.searchString.toLowerCase();
  return sortedProg.value.filter(event => {
    const matchesText = !searchString || 
                        event.section === 'events' ||
                        event.textToSearch.includes(searchString);
    const matchesSection = filter.value.sections.includes(event.section);
    const matchesType = filter.value.types.includes(event.type);
    const matchesDay = filter.value.days.includes(event.day);
    const matchesChecked = !filter.value.showOnlyChecked || 
                           event.section === 'events' ||
                           checkedPresentations.value.has(event.id);
    const matchesCurrent = !isLive.value || 
                           !filter.value.showOnlyCurrent || 
                           event.section === 'events' || 
                           event.status === 'current';
    return matchesText && matchesSection && matchesType && matchesDay && matchesChecked && matchesCurrent;
  });
});

function formatTime(isoString) {
  return isoString.slice(11, 16);
}

const scheduleGrid = computed(() => {
  const makeSkipEvent = time => ({skip: true, end: time});

  const grid = {};

  filteredProg.value.forEach(p => {
    //const day = p.start.split('T')[0];
    const day = p.day;
    if (!grid[day]) {
      grid[day] = {};
    }
    if (!grid[day][p.start]) {
      grid[day][p.start] = {};
    }
    if (p.type === 'poster') {
      if (!grid[day][p.start][p.section]) {
        grid[day][p.start][p.section] = [];
      }
      grid[day][p.start][p.section].push(p);
    } else {
      grid[day][p.start][p.section] = p;
    }
  });

  const sortedDays = Object.keys(grid).sort();
  const rearrangedGrid = sortedDays.map(day => {
    const sortedTimes = Object.keys(grid[day]).sort();
    const blocks = [];
    let currentBlock = null;
    sortedTimes.forEach(start => {
      const sectionEvents = grid[day][start];
      const sectionTitles = Object.keys(sectionEvents).sort();
      const specialSections = ['events', 'plenary', 'vip'];
      const thisIsPosterSlot = Object.values(sectionEvents).some(e => Array.isArray(e));
      const assignSectionRooms = (sectionRooms) => {
        if (!thisIsPosterSlot) {
          sectionTitles.forEach(section => {
            sectionRooms[section] = sectionRooms[section] ?? sectionEvents[section]?.room;
          });
        }
      }
      let end = null;
      if (!thisIsPosterSlot) {
        const endTimes = Object.values(sectionEvents).map(e => e.end);
        end = endTimes.reduce((min, current) => current < min ? current : min);// endTimes.sort()[0];
      } else { // the time of the first arbitrary poster event
        end = Object.values(sectionEvents)[0][0].end;
      }
      const needNewBlock = !currentBlock || 
            (sectionTitles.some(s => specialSections.includes(s)) && !currentBlock.sectionTitles.some(s => specialSections.includes(s))) ||
            (!sectionTitles.some(s => specialSections.includes(s)) && currentBlock.sectionTitles.some(s => specialSections.includes(s))) ||
            (sectionTitles.some(s => specialSections.includes(s)) && !currentBlock.sectionTitles.every(s => sectionTitles.includes(s))) || 
            (!currentBlock.poster && thisIsPosterSlot);
      if (needNewBlock) {
        currentBlock = {
          poster: thisIsPosterSlot,
          sectionTitles: sectionTitles,
          sectionRooms: {},
          timeSlots: []
        }
        blocks.push(currentBlock);
      } else {
        const originalTitles = new Set(currentBlock.sectionTitles);
        const newUniqueTitles = sectionTitles.filter(t => !originalTitles.has(t));
        if (newUniqueTitles.length) {
          currentBlock.sectionTitles.push(...newUniqueTitles);
          currentBlock.sectionTitles = currentBlock.sectionTitles.sort();
        }
      }
      assignSectionRooms(currentBlock.sectionRooms);
      let sectionEventsWithSkips = sectionEvents;
      if (currentBlock.timeSlots.length > 0) {
        const previousTimeSlot = currentBlock.timeSlots.at(-1);
        sectionEventsWithSkips = Object.fromEntries(currentBlock.sectionTitles.map(sectionTitle => {
          let event = sectionEvents[sectionTitle] ?? null;
          const endTimeOfPreviousEvent = previousTimeSlot.events[sectionTitle]?.end; // in this section, that is
          if (!event && endTimeOfPreviousEvent && endTimeOfPreviousEvent > start) {
            event = makeSkipEvent(endTimeOfPreviousEvent);
          }
          return [sectionTitle, event];
        }));
      }
      currentBlock.timeSlots.push({
        start: start,
        end: end,
        events: sectionEventsWithSkips
      });
    });
    blocks.forEach((block) => {
      if (!block.poster) {
        for (let i = 0; i < block.timeSlots.length; i++) {
          const eventArray = Object.values(block.timeSlots[i].events);
          const endTimes = eventArray.map(e => e?.end ?? '1970-01-01T00:00:00');
          const maxEndTime = endTimes.reduce((max, current) => current > max ? current : max);
          if (maxEndTime && (maxEndTime > block.timeSlots[i].end) && ((i === block.timeSlots.length - 1) || (block.timeSlots[i+1].start >= maxEndTime))) {
            const slot = {
              start: block.timeSlots[i].end,
              end: maxEndTime,
              events: Object.entries(block.timeSlots[i].events).reduce((acc, [section, event]) => {
                acc[section] = null;
                if (event && (event.end > block.timeSlots[i].end)) {
                  acc[section] = makeSkipEvent(event.end);
                }
                return acc;
              }, {})
            }
            block.timeSlots.splice(i + 1, 0, slot);
            i++;
          } else if ((i < block.timeSlots.length - 1) && (block.timeSlots[i].end === block.timeSlots[i+1].end)) {
            block.timeSlots[i].end = block.timeSlots[i+1].start;
          }
        }
      }
    });
    return {
      day: day,
      blocks: blocks
    }
  });

  return rearrangedGrid;
});

function dontShowSectionTitles(sectionTitles) {
  return sectionTitles.some(t => ['events', 'vip'].includes(t));
}

/* LIVE STATUS UPDATES */

const isDev = import.meta.env.DEV;

// 'http://127.0.0.1:8000/prog/'
// 'https://api.064329.xyz/prog/'
// 'https://api.rcct2026.ru/prog/'
const backendProgramEndpoint = 'https://api.rcct2026.ru/prog/';
const backendApiGatewayBackup = 'https://d5dfof06fmarqek2p1j2.p8361f8z.apigw.yandexcloud.net/prog/';

let lastEtag = null;
let isFirstRun = true;
const isLive = ref(false);
const lastFetchStatus = ref({
  success: false,
  time: null,
  backupFired: false
});
const currentPresentationCounter = ref(0);

async function fetchWithFallback(primaryUrl, fallbackUrl, timeout=5000) {
  const controller = new AbortController();
  const signal = controller.signal;

  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => {
      controller.abort();
      reject(new Error(`Primary fetch timed out after ${timeout} ms`));
    }, timeout)
  );

  try {
    const response = await Promise.race([
      fetch(primaryUrl, { signal }),
      timeoutPromise
    ]);

    if (!response.ok) {
      throw new Error(`Primary fetch failed with status: ${response.status}`);
    }

    lastFetchStatus.value.backupFired = false;
    return response;
  } catch (error) {
    console.warn(`${error.message}. Trying fallback URL...`);

    lastFetchStatus.value.backupFired = true;
    const fallbackResponse = await fetch(fallbackUrl);

    if (!fallbackResponse.ok) {
      throw new Error(`Fallback fetch also failed with status: ${fallbackResponse.status}`);
    }

    return fallbackResponse;
  }
}

async function fetchLiveStatuses() {
  let success = false;
  try {
      const response = await fetchWithFallback(backendProgramEndpoint, backendApiGatewayBackup);
      const etag = response.headers.get('ETag');
      if (etag && etag !== lastEtag) {
          const liveStatuses = await response.json();
          currentPresentationCounter.value = Object.values(liveStatuses).filter(x => x.status === 'current').length;
          const liveIDs = new Set(Object.keys(liveStatuses));
          sortedProg.value.forEach(event => {
            if (liveIDs.has(event.id)) {
              for (const [key, value] of Object.entries(liveStatuses[event.id])) {
                event[key] = value;
              }
            } else if (!['event', 'poster'].includes(event.type)) {
              event.status = 'scheduled';
            }
          });
          lastEtag = etag;
      }
      isLive.value = true;
      success = true;
  } catch (e) {
      console.warn("Could not fetch live updates: ", e);
      //isLive.value = false; 
  } finally {
      lastFetchStatus.value.success = success;
      lastFetchStatus.value.time = new Date();
      const shouldContinue = success || !isFirstRun;
      isFirstRun = false;
      return shouldContinue;
  }
}

usePolling(fetchLiveStatuses, (isDev ? 5000 : 15000));
</script>

<template>
  <Filter v-model="filter" 
          :lang="lang"
          :checkedPresentations="checkedPresentations"
          :isLive="isLive"
          :lastFetchStatus="lastFetchStatus"
          :currentCount="currentPresentationCounter" />
  <div class="program-wrapper">
    <div class="day-wrapper" v-for="(dayObj, dayObjIndex) in scheduleGrid" :key="dayObj.day">
      <hr v-if="dayObjIndex !== 0" class="day-separator" />
      <h4 class="day-header">{{ tr.trDate[lang](dayObj.day) }}</h4>

      <template v-for="(block, index) in dayObj.blocks" :key="index">

        <template v-if="!block.poster">
          <div v-if="filter.display === 'grid'"
               class="event-block"
               :class="filter.display"
               :style="`grid-template-columns: minmax(min-content, max-content) repeat(${block.sectionTitles.length}, minmax(min-content, 1fr));`">
            <template v-if="!dontShowSectionTitles(block.sectionTitles)">
              <div class="empty-placeholder"></div>
              <div v-for="sectionTitle in block.sectionTitles" :key="sectionTitle" class="section-title">
                {{ explainSection(sectionTitle) }}{{ block.sectionRooms && ` (${block.sectionRooms[sectionTitle]})` }}
              </div>
            </template>
            <template v-for="(slot, index) in block.timeSlots" :key="slot.start">
              <div class="time">{{ formatTime(slot.start) }}-<wbr/>{{ formatTime(slot.end) }}</div>
              <template v-for="sectionTitle in block.sectionTitles" :key="sectionTitle">
                <div v-if="!slot.events[sectionTitle]" class="empty-placeholder"></div>
                <EventCard v-else-if="slot.events[sectionTitle] && !slot.events[sectionTitle].skip"
                          :lang="lang"
                          :filter="filter"
                          :key="slot.events[sectionTitle].id"
                          :event="slot.events[sectionTitle]"
                          :checked="checkedPresentations.has(slot.events[sectionTitle].id)"
                          @check="handleCheckEventCard"
                          :spanTwoRows="((index < block.timeSlots.length - 1) && (block.timeSlots[index + 1].start < slot.events[sectionTitle].end))
                          || slot.events[sectionTitle].end > slot.end" />
              </template>
            </template>
          </div>

          <template v-else-if="filter.display === 'list'">
            <div class="event-block"
                 :class="filter.display"
                 v-for="sectionTitle in block.sectionTitles" :key="sectionTitle">
              <div v-if="!dontShowSectionTitles(block.sectionTitles)" class="section-title">
                {{ explainSection(sectionTitle) }}{{ block.sectionRooms && ` (${block.sectionRooms[sectionTitle]})` }}
              </div>
              <template v-for="slot in block.timeSlots" :key="slot.start">
                <div class="event-card-with-time-wrapper" v-if="slot.events[sectionTitle] && !slot.events[sectionTitle].skip">
                  <div class="time">{{ formatTime(slot.events[sectionTitle].start) }}-<wbr/>{{ formatTime(slot.events[sectionTitle].end) }}</div>
                  <EventCard 
                    :lang="lang" 
                    :filter="filter" 
                    :event="slot.events[sectionTitle]" 
                    :checked="checkedPresentations.has(slot.events[sectionTitle].id)"
                    @check="handleCheckEventCard" />
                </div>
              </template>
            </div>
          </template>
        </template>

        <div v-else class="poster-block">
          <template v-for="slot in block.timeSlots" :key="slot.start">
            <div class="section-title">
              {{ formatTime(slot.start) }}-<wbr/>{{ formatTime(slot.end) }} {{ tr.posterSession[lang] }}
            </div>
            <template v-for="(eventArray, sectionTitle) in slot.events">
              <div class="section-title">{{ explainSection(sectionTitle) }}</div>
              <EventCard v-for="event in eventArray"
                          :key="event.id"
                          :lang="lang"
                          :event="event"
                          :filter="filter"
                          :checked="checkedPresentations.has(event.id)"
                          @check="handleCheckEventCard" />
            </template>
          </template>
        </div>

      </template>
    </div>
  </div>
</template>

<style scoped>
  .program-wrapper {
    margin-top: 1rem;
  }
  .program-wrapper h4 {
    margin: 1rem 0 0.5rem;
  }
  .time,
  .section-title {
    font-weight: bold;
  }
  .time {
    align-self: center;
  }
  .event-block {
    display: grid;
    gap: 5px;
    margin-bottom: 5px;
  }
  .event-block.list .event-card-with-time-wrapper {
    display: grid;
    gap: 5px;
    grid-template-columns: max-content 1fr;
  }
  .span2 {
    grid-row: span 2;
  }
  .poster-block {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .day-separator {
    margin-top: 2.5rem;
    margin-bottom: 0.5rem;
    border: none;
    border-radius: 5px;
    height: 5px;
    background: linear-gradient(to right, var(--tertiary), transparent);
  }
  .day-header {
    font-weight: bold;
  }
  @media only screen and (max-width: 600px) {
    .event-block.list .event-card-with-time-wrapper {
      grid-template-columns: 1fr;
    }
  }
</style>
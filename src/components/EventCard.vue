<script setup>
import { computed } from 'vue';
import { tr } from './helpers.js';

const props = defineProps({
  lang: {
    type: String,
    default: 'en'
  },
  event: Object,
  filter: Object,
  checked: Boolean,
  spanTwoRows: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['check']);

const handleCheck = () => {
  emit('check', props.event.id);
};

const abstractHref = computed(() => {
  const page = props.event.page;
  return page ? `/abstracts/${page.toString().padStart(3, '0')}.html` : null;
});

const checkableTypes = ['plenary', 'key', 'oral', 'poster'];

const wrapperClass = computed(() => {
  let result = `section-${props.event.section} type-${props.event.type}`
  if (props.spanTwoRows) {
    result += ' span2';
  }
  if (props.event.status) {
    result += ` status-${props.event.status}`;
  }
  return result;
});

const timeFormatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'Asia/Yekaterinburg'
});

const statusHtml = computed(() => {
  const times = [props.event.time_started, props.event.time_finished].map(
    dateText => dateText ? timeFormatter.format(new Date(dateText)) : null
  ).filter(Boolean);
  const timesText = times.length ? ` (${times.join(' - ')})` : '';
  let html = '';
  const translatedStatus = tr.status[props.lang][props.event.status];
  switch(props.event.status) {
    case 'current':
        html = `<span class="hourglass">⏳</span><span> ${translatedStatus}...${timesText}</span></>`;
        break;
    case 'delivered':
        html = `✅ ${translatedStatus}${timesText}`;
        break;
    case 'cancelled':
        html = `❌ ${translatedStatus}`;
        break;
    case undefined:
        break;
    case 'scheduled':
        //break;
    default:
        html = `📅 ${translatedStatus}`;
        break;
  }
  return html;
});
</script>

<template>
  <div class="event-wrapper" :class="wrapperClass">
    <div v-if="event.status" class="status" v-html="statusHtml"></div>
    <div v-html="(lang === 'ru' && event.title_ru) ? event.title_ru : event.title"></div>
    <div class="authors" v-if="event.presenter && filter.showAuthors === 'presenter'">{{ event.presenter }}</div>
    <div class="authors" v-else-if="event.authors && filter.showAuthors === 'coauthors'" v-html="event.authors"></div>
    <div class="affs" v-if="event.affs && filter.showAffs">{{ event.affs }}</div>
    <div class="additionals">
      <a v-if="abstractHref" :href="abstractHref" target="_blank"><i class="large">article_shortcut</i></a>
      <label class="checkbox" v-if="checkableTypes.includes(event.type)">
        <input type="checkbox" :checked="checked" @change="handleCheck">
        <span></span>
      </label>
    </div>
  </div>
</template>

<style scoped>
  .event-wrapper {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px;
    background: #fff;
    box-shadow: var(--elevate1);
    max-width: 1024px;
    display: flex;
    flex-direction: column;
  }
  .additionals {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
  }
  .additionals .checkbox {
    margin-left: auto;
  }
  .type-poster {
    border: 2px dashed darkgray;
    box-shadow: none;
  }
  .type-plenary, 
  .type-key, 
  .section-vip {
    border: 1.5px solid #33691E;
    background: #F1F8E9;
  }
  .type-event {
    border: 1.5px solid gold;
    background: #FFFDE7;
  }
  .authors {
    font-style: italic;
  }
  .authors :deep(u) {
    vertical-align: unset !important;
  }
  .affs {
    font-size: 0.9em;
  }
  .span2 {
    grid-row: span 2;
  }

  .event-wrapper.status-current {
    animation: shadowPulse 2s infinite ease-in-out;
  }
  @keyframes shadowPulse {
    0%, 100% {
      box-shadow: var(--elevate1);
    }
    50% {
      box-shadow: 0 0 3px 3px var(--tertiary);
    }
  }

  .status {
    color: var(--presentation-status-color);
  }
  .status :deep(.hourglass) {
    animation: rotate 5s linear infinite;
    transform-origin: center;
    display: inline-block;
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
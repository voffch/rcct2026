<script setup>
import { ref } from 'vue';
import { tr, days, defaultFilter } from './helpers.js';
import FilterHelp from './FilterHelp.vue';

const props = defineProps({
  lang: {
    type: String,
    default: 'en'
  },
  checkedPresentations: {
    type: Object
  }
});

const untouchableSections = ['events', 'vip'];

const toggleableSections = Object.keys(tr.sectionNames[props.lang]).filter(section => !untouchableSections.includes(section));

const untouchableType = 'event';

const toggleableTypes = Object.keys(tr.eventTypeNames[props.lang]).filter(type => type !== untouchableType);

const filter = defineModel();

function showHideFilterClick() {
  filter.value.hidden = !filter.value.hidden;
}

const helpHidden = ref(true);

function clearSearch() {
  filter.value.searchString = '';
}

function clearFilter() {
  filter.value = {...structuredClone(defaultFilter), hidden: false};
}

const toggleSections = ref(true);

const handleToggleSections = () => {
  if (toggleSections.value) {
    filter.value.sections = [...untouchableSections];
  } else {
    filter.value.sections = [...defaultFilter.sections];
  }
  toggleSections.value = !toggleSections.value;
};

const toggleDays = ref(true);

const handleToggleDays = () => {
  if (toggleDays.value) {
    filter.value.days = [];
  } else {
    filter.value.days = [...defaultFilter.days];
  }
  toggleDays.value = !toggleDays.value;
};

const toggleTypes = ref(true);

const handleToggleTypes = () => {
  if (toggleTypes.value) {
    filter.value.types = [untouchableType];
  } else {
    filter.value.types = [...defaultFilter.types];
  }
  toggleTypes.value = !toggleTypes.value;
};
</script>

<template>
  <div class="filter-wrapper" :class="{ 'help-shown': !helpHidden }">

    <button v-if="helpHidden" class="show-hide border small-round small-elevate" @click="() => {helpHidden = !helpHidden}">
      <i>help_center</i>
      <span>{{ tr.hideHelp[lang](helpHidden) }}</span>
    </button>
    <article v-else :class="{ 'article-button-only': helpHidden }">
      <div class="show-hide-button-wrapper">
        <button class="show-hide border small-round small-elevate" @click="() => {helpHidden = !helpHidden}">
          <i>help_center</i>
          <span>{{ tr.hideHelp[lang](helpHidden) }}</span>
        </button>
      </div>
      <FilterHelp :lang="lang" :checkedPresentations="checkedPresentations" />
    </article>

    <button v-if="filter.hidden" class="show-hide border small-round small-elevate" @click="showHideFilterClick">
      <i>{{ filter.hidden ? 'expand_circle_down' : 'expand_circle_up' }}</i>
      <span>{{ tr.hideFilterButton[lang](filter.hidden) }}</span>
    </button>
    <article v-else :class="{ 'article-button-only': filter.hidden }">
      <div class="show-hide-button-wrapper">
        <button class="show-hide border small-round small-elevate" @click="showHideFilterClick">
          <i>{{ filter.hidden ? 'expand_circle_down' : 'expand_circle_up' }}</i>
          <span>{{ tr.hideFilterButton[lang](filter.hidden) }}</span>
        </button>
      </div>
      <div class="filter-controls-wrapper" v-if="!filter.hidden">
        <div class="fieldset-wrapper">
          <fieldset class="grid-checkboxes large">
            <legend>
              <button class="transparent square small" @click="handleToggleSections">
                <i>{{ toggleSections ? 'check_box' : 'check_box_outline_blank' }}</i>
              </button>
            {{ tr.sections[lang] }}
            </legend>
            <label v-for="section in toggleableSections" :key="section" class="checkbox">
              <input type="checkbox" :value="section" v-model="filter.sections">
              <span>{{ tr.sectionNames[lang][section] }}</span>
            </label>
          </fieldset>
          <fieldset class="grid-checkboxes">
            <legend>
              <button class="transparent square small" @click="handleToggleTypes">
                <i>{{ toggleTypes ? 'check_box' : 'check_box_outline_blank' }}</i>
              </button>
              {{ tr.eventType[lang] }}
            </legend>
            <label v-for="type in toggleableTypes" :key="type" class="checkbox">
              <input type="checkbox" :value="type" v-model="filter.types">
              <span>{{ tr.eventTypeNames[lang][type] }}</span>
            </label>
          </fieldset>
          <fieldset class="grid-checkboxes">
            <legend>
              <button class="transparent square small" @click="handleToggleDays">
                <i>{{ toggleDays ? 'check_box' : 'check_box_outline_blank' }}</i>
              </button>
              {{ tr.days[lang] }}
            </legend>
            <label v-for="day in days" :key="day" class="checkbox">
              <input type="checkbox" :value="day" v-model="filter.days">
              <span>{{ tr.trDate[lang](day) }}</span>
            </label>
          </fieldset>
          <fieldset class="grid-display-settings">
            <legend>{{ tr.displaySettings[lang] }}</legend>
            <div class="display-settings field suffix small border">
              <select v-model="filter.display">
                <option v-for="v in Object.keys(tr.displaySettingNames[lang])" :key="v" :value="v">
                  {{ tr.displaySettingNames[lang][v] }}
                </option>
              </select>
              <i>arrow_drop_down</i>
            </div>
            <div class="presenter-settings field suffix small border">
              <select v-model="filter.showAuthors">
                <option v-for="v in Object.keys(tr.showPresenterNames[lang])" :key="v" :value="v">
                  {{ tr.showPresenterNames[lang][v] }}
                </option>
              </select>
              <i>arrow_drop_down</i>
            </div>
            <label class="checkbox">
              <input type="checkbox" v-model="filter.showAffs">
              <span>{{ tr.showAffs[lang] }}</span>
            </label>
          </fieldset>
          <fieldset class="grid-display-settings">
            <legend>{{ tr.showOnly[lang] }}</legend>
            <label class="checkbox">
              <input type="checkbox" v-model="filter.showOnlyChecked">
              <span>{{ tr.checked[lang] }}: {{ checkedPresentations.size }}&nbsp;</span><i class="tiny">check_box</i>
            </label>
          </fieldset>
        </div>
        <div class="filter-input-wrapper">
          <div class="filter-input field label prefix border small">
            <i>search</i>
            <input v-model.trim="filter.searchString" type="text" placeholder=" ">
            <label>{{ tr.titleOrCoauthor[lang] }}</label>
          </div>
          <button class="clear-filter border small-round small-elevate" @click="clearSearch">
            <i>ink_eraser</i>
            <span>{{ tr.clearSearch[lang] }}</span>
          </button>
          <button class="clear-filter border small-round small-elevate" @click="clearFilter">
            <i>delete</i>
            <span>{{ tr.clearAll[lang] }}</span>
          </button>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
  .filter-wrapper {
    margin-top: 5px;
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    flex-wrap: wrap;
  }
  .filter-wrapper.help-shown {
    flex-direction: column;
    flex-wrap: nowrap;
  }
  .filter-wrapper > article,
  .filter-wrapper > button {
    margin: 0;
  }
  .article-button-only {
    width: max-content;
  }
  .grid-checkboxes > legend button {
    margin: 0;
  }
  .show-hide {
    margin: 0;
  }
  .filter-controls-wrapper {
    margin-top: 1rem;
  }
  .filter-input-wrapper {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
  }
  .filter-input-wrapper button {
    margin: 0;
  }
  .filter-input-wrapper button:first-of-type {
    margin: 0;
    margin-left: auto;
  }
  .filter-input {
    margin-block-end: 0.5rem;
    margin: 0;
    flex-grow: 1;
  }
  .fieldset-wrapper {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-auto-flow: dense;
    gap: 15px;
  }
  .grid-checkboxes.large {
    grid-row: span 2;
  }
  .grid-checkboxes {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    padding-left: 0.25rem;
    margin-top: 0;
  }
  .grid-checkboxes > legend {
    margin-left: 0.4rem;
  }
  .grid-checkboxes .checkbox {
    display: grid;
    grid-template-columns: 24px 1fr; 
    align-items: start;
    gap: 8px;
    width: 100%;
  }
  .grid-checkboxes .checkbox span {
    min-width: 0;
    white-space: normal;
    overflow-wrap: break-word;
    text-align: left;
    padding-top: 2px;
  }
  .grid-display-settings {
    margin-top: 0;
  }
  .grid-display-settings {
    display: flex;
    gap: 1rem;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .display-settings {
    min-width: 8rem;
    margin: 0;
  }
  .presenter-settings {
    min-width: 15rem;
    margin: 0;
  }
  @media only screen and (max-width: 600px) {
    .filter-wrapper {
      margin-top: 0;
      justify-content: end;
    }
    .show-hide-button-wrapper {
      display: flex;
      justify-content: end;
    }
    .fieldset-wrapper {
      grid-template-columns: 1fr;
    }
  }
</style>
<script setup>
import { computed } from 'vue';

const props = defineProps({
  lang: {
    type: String,
    default: 'en'
  },
  event: Object,
  filter: Object,
  spanTwoRows: {
    type: Boolean,
    default: false
  }
});

const checked = defineModel({
  type: Array
});

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
  return result;
});
</script>

<template>
  <div class="event-wrapper" :class="wrapperClass">
    <div v-html="(lang === 'ru' && event.title_ru) ? event.title_ru : event.title"></div>
    <div class="authors" v-if="event.presenter && filter.showAuthors === 'presenter'">{{ event.presenter }}</div>
    <div class="authors" v-else-if="event.authors && filter.showAuthors === 'coauthors'" v-html="event.authors"></div>
    <div class="affs" v-if="event.affs && filter.showAffs">{{ event.affs }}</div>
    <div class="additionals">
      <a v-if="abstractHref" :href="abstractHref" target="_blank"><i class="large">article_shortcut</i></a>
      <label class="checkbox" v-if="checkableTypes.includes(event.type)">
        <input type="checkbox" :value="event.id" v-model="checked">
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
</style>
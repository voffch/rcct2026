<script setup>
import EventCard from './EventCard.vue';
import { tr } from './helpers.js';

const props = defineProps({
  lang: {
    type: String,
    default: 'en'
  }
});

const dummyEvents = {
  en: [
    {
      "id": "0",
      "title": "Key and plenary lectures",
      "section": "plenary",
      "type": "plenary",
      "start": "2026-06-30T01:00:00",
      "end": "2026-06-00:00:00"
    },
    {
      "id": "1",
      "title": "Oral presentations",
      "section": "section",
      "type": "oral",
      "start": "2026-06-30T01:00:00",
      "end": "2026-06-00:00:00"
    },
    {
      "id": "2",
      "title": "Poster presentations",
      "section": "section",
      "type": "poster",
      "start": "2026-06-30T01:00:00",
      "end": "2026-06-00:00:00"
    },
    {
      "id": "3",
      "title": "Common events",
      "section": "events",
      "type": "event",
      "start": "2026-06-30T01:00:00",
      "end": "2026-06-00:00:00"
    },
  ],
  ru: [
    {
      "id": "0",
      "title": "Ключевые и пленарные доклады",
      "section": "plenary",
      "type": "plenary",
      "start": "2026-06-30T01:00:00",
      "end": "2026-06-00:00:00"
    },
    {
      "id": "1",
      "title": "Устные доклады",
      "section": "section",
      "type": "oral",
      "start": "2026-06-30T01:00:00",
      "end": "2026-06-00:00:00"
    },
    {
      "id": "2",
      "title": "Стендовые доклады",
      "section": "section",
      "type": "poster",
      "start": "2026-06-30T01:00:00",
      "end": "2026-06-00:00:00"
    },
    {
      "id": "3",
      "title": "Общие события",
      "section": "events",
      "type": "event",
      "start": "2026-06-30T01:00:00",
      "end": "2026-06-00:00:00"
    },
  ]
}
</script>

<template>
  <div v-if="lang === 'ru'" class="help-wrapper">
    В этой интерактивной программе представлены следующие типы событий:
    <div class="dummy-event-wrapper">
      <EventCard v-for="(event, index) in dummyEvents[lang]" :event="event" :key="index" />
    </div>
    Нажав на значок <i>article_shortcut</i> на карточке доклада, вы можете открыть в соседней вкладке HTML-версию тезисов. Ссылка на PDF-страницу из сборника тезисов расположена внизу страницы HTML-версии. Обратите внимание на то, что до официальной публикации сборника тезисов страницы в сборнике (и ссылки на конкретные тезисы) не являются окончательными и могут поменяться.
    <p>С помощью галочки <i>check_box_outline_blank</i> в углу карточек можно отмечать заинтересовавшие вас доклады. Информация о том, какие доклады вы отметили, сохраняется в браузере.</p>
    <p>Чтобы проще ориентироваться в программе, можно использовать фильтр, который открывается по нажатию кнопки <strong>{{ tr.hideFilterButton[lang](true) }}</strong>. Убирая ненужные галочки, сужайте программу до интересующих вас секций, дней и типов докладов. Также можно показать только ранее отмеченные доклады (и общие события, которые отображаются всегда). В настройках отображения выберите, в каком виде показывать параллельные секции (списком, сортированным по секциям и затем в хронологическом порядке, или сеткой), соавторов доклада и их аффилиации.</p>
    <p>Набрав в поисковой строке <i>search</i> в любом регистре часть названия доклада или имени соавтора, можно найти конкретный доклад. Имена в программе и сборнике представлены в формате "Фамилия И.О." или "Фамилия Имя".</p>
    <p>Настройки фильтра также сохраняются в вашем браузере. Для того, чтобы вернуть фильтр в исходное состояние и показать программу целиком, используйте кнопки: <strong>{{ tr.clearSearch[lang] }}</strong> сбрасывает только содержимое поисковой строки, а <strong>{{ tr.clearAll[lang] }}</strong> - вообще все настройки фильтра и отображения.</p>
    <p>Чтобы вернуться наверх страницы, нажмите на логотип RCCT в меню или рядом с ним.</p>
  </div>
  <div v-else class="help-wrapper">
    The following types of events are shown in this interactive program:
    <div class="dummy-event-wrapper">
      <EventCard v-for="(event, index) in dummyEvents[lang]" :event="event" :key="index" />
    </div>
    By clicking this icon <i>article_shortcut</i> on the presentation card, you can open the HTML abstract in an additional browser tab. The link to the PDF page from the book of abstracts will be located at the bottom of the HTML abstract. Please be aware that until the book of abstracts is officially published, the pages (and the URLs of the particular abstracts) are preliminary and could change.
    <p>The checkboxes <i>check_box_outline_blank</i> located in the corner of the presentation cards allow you to mark the presentations that caught your interest. The data regarding the presentations you marked (checked) is saved in your browser.</p>
    <p>To facilitate navigating the program, please use the filter that opens by pressing the <strong>{{ tr.hideFilterButton[lang](true) }}</strong> button. By clicking the checkboxes there, you can reduce the program to the sections, presentations and days that appeal to you the most. You can also choose to display only the previously checked presentations (in addition to the common events, which are always shown). Next, in the Display settings, you may set up how to represent the parallel (simultaneous) sections: as a list sorted by section and then chronologically, or as a grid. Whether to show the coauthors and their affiliations can also be chosen therein.</p>
    <p>By typing into the case-insensitive text input <i>search</i> a part of the presentation title or coauthor name, you can find a particular presentation. The names in both the program and the book of abstracts follow the "Surname F.M." or "Surname Firstname" pattern.</p>
    <p>The filter settings are saved in your browser as well. You can clear the search string by clicking the <strong>{{ tr.clearSearch[lang] }}</strong> button, and the <strong>{{ tr.clearAll[lang] }}</strong> button clears all the filter and display settings, allowing you to see the whole program again.</p>
    <p>To scroll to the very top of the page, click the RCCT logo in the navigation menu (or to the left of it).</p>
  </div>
</template>

<style scoped>
  .help-wrapper {
    margin-top: 0.5rem;
    max-width: 64rem;
  }
  .dummy-event-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 0.5rem 0;
  }
</style>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  lang: {
    type: String,
    default: 'en'
  }
});

const ourTime = ref('');
const ourTimezone = 'Asia/Yekaterinburg';
const localTime = ref('');
let localTimezone = '';
const dateOptions = { month: 'long', day: 'numeric' };
const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };

function formatDate(dateObj, timezone) {
  const locale = props.lang === 'ru' ? 'ru-RU' : 'en-US';
  const dateStr = dateObj.toLocaleDateString(locale, {...dateOptions, timeZone: timezone});
  const timeStr = dateObj.toLocaleTimeString(locale, {...timeOptions, timeZone: timezone});
  return `${dateStr}, ${timeStr}`; 
}

const updateClocks = () => {
  const now = new Date();
  ourTime.value = formatDate(now, ourTimezone);
  localTime.value = formatDate(now, localTimezone);
};

let timerId = null;

onMounted(() => {
  localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  updateClocks();
  timerId = setInterval(updateClocks, 1000); 
});

onUnmounted(() => {
  clearInterval(timerId);
});
</script>

<template>
  <p v-if="lang === 'ru'">
    В программе используется местное время (Asia/Yekaterinburg, GMT+5). В Екатеринбурге сейчас <strong>{{ ourTime }}</strong>, что <template v-if="ourTime === localTime">совпадает с вашим системным временем</template><template v-else> <strong>отличается</strong> от вашего системного времени ({{ localTime }})</template>.</p>
  <p v-else>This program uses local time (Asia/Yekaterinburg, GMT+5). In Ekaterinburg now it's <strong>{{ ourTime }}</strong>, which <template v-if="ourTime === localTime">is the same as your system time</template><template v-else> <strong>differs</strong> from your system time ({{ localTime }})</template>.</p>
</template>
import prog from './prog.json';

export const tr = {
  sections: {
    en: 'Sections',
    ru: 'Секции'
  },
  sectionNames: {
    en: {
      'plenary': 'Plenary Lectures',
      'S1': 'S1: Fundamental issues and new challenges in chemical thermodynamics',
      'S2': 'S2: Thermodynamic properties and processes in solids',
      'S3': 'S3: Thermodynamic properties and processes in solutions and fluids',
      'S4': 'S4: Thermodynamics of heterogeneous systems, surfaces, interphase and membrane processes, and nanoscale systems',
      'S5': 'S5: New approaches, methods and goals in thermodynamic modeling. Thermodynamic databases',
      'S6': 'S6: Thermodynamic aspects of synthesizing, analyzing and predicting the properties of novel materials',
      'S7': 'S7: Round table discussion «Chemical thermodynamics in higher education»',
      'S8': 'S8: Special session on the development of measurement methods and experimental setups in thermal analysis and calorimetry',
      'events': 'Events',
      'vip': 'Sponsor Presentations'
    },
    ru: {
      'plenary': 'Пленарные доклады',
      'S1': 'S1: Фундаментальные проблемы и новые задачи химической термодинамики',
      'S2': 'S2: Термодинамические свойства и процессы в твердофазных системах',
      'S3': 'S3: Термодинамические свойства и процессы в растворах и флюидных системах',
      'S4': 'S4: Термодинамика гетерогенных систем, поверхностных явлений, межфазных и мембранных процессов, свойства наносистем',
      'S5': 'S5: Новые подходы, методы и задачи в области термодинамического моделирования. Базы и банки данных',
      'S6': 'S6: Термодинамические аспекты создания новых материалов, анализа и прогнозирования их свойств',
      'S7': 'S7: Круглый стол «Преподавание химической термодинамики в высшей школе»',
      'S8': 'S8: Специальная сессия, посвященная развитию методов и созданию приборов термического анализа и калориметрии',
      'events': 'События',
      'vip': 'Доклады спонсоров'
    }
  },
  days: {
    en: 'Days',
    ru: 'Даты'
  },
  trDate: {
    en: (isoDateString) => translateDate(isoDateString, 'en'),
    ru: (isoDateString) => translateDate(isoDateString, 'ru'),
  },
  eventType: {
    en: 'Presentations',
    ru: 'Доклады'
  },
  eventTypeNames: {
    en: {
      'plenary': 'Plenary Lectures',
      'key': 'Key Lectures',
      'oral': 'Oral Presentations',
      'poster': 'Poster Presentations',
      'event': 'Events'
    },
    ru: {
      'plenary': 'Пленарные',
      'key': 'Ключевые',
      'oral': 'Устные',
      'poster': 'Стендовые',
      'event': 'События'
    }
  },
  hideHelp: {
    en: (hidden) => (hidden ? 'Help' : 'Hide help'),
    ru: (hidden) => (hidden ? 'Справка' : 'Закрыть справку')
  },
  hideFilterButton: {
    en: (hidden) => ((hidden ? 'Show' : 'Hide') + ' filter and display settings'),
    ru: (hidden) => ((hidden ? 'Фильтр и отображение' : 'Закрыть настройки фильтра') + ' ')
  },
  displaySettings: {
    en: 'Display settings',
    ru: 'Отображение'
  },
  displaySettingNames: {
    en: {
      'list': 'List',
      'grid': 'Grid'
    },
    ru: {
      'list': 'Список',
      'grid': 'Сетка'
    }
  },
  showPresenterNames: {
    en: {
      presenter: 'Show presenter only',
      coauthors: 'Show all coauthors',
      none: 'Do not show authors'
    },
    ru: {
      presenter: 'Только докладчик',
      coauthors: 'Все соавторы',
      none: 'Скрыть соавторов'
    }
  },
  showAffs: {
    en: 'Show Affiliations',
    ru: 'Показать аффилиации'
  },
  showOnly: {
    en: 'Limit To',
    ru: 'Ограничить'
  },
  checked: {
    en: 'Checked',
    ru: 'Отмеченными'
  },
  current: {
    en: 'Underway',
    ru: 'Текущими'
  },
  titleOrCoauthor: {
    en: 'title or coauthor',
    ru: 'название или соавтор'
  },
  clearSearch: {
    en: 'Clear String',
    ru: 'Очистить'
  },
  clearAll: {
    en: 'Clear ALL',
    ru: 'Сбросить всё'
  },
  posterSession: {
    en: 'Poster Session',
    ru: 'Стендовая сессия'
  },
  status: {
    en: {
      current: 'Underway',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
      scheduled: 'Scheduled'
    },
    ru: {
      current: 'Докладывается',
      delivered: 'Состоялся',
      cancelled: 'Отменен',
      scheduled: 'Запланирован'
    }
  }
};

function translateDate(isoDateString, lang) {
  const date = new Date(isoDateString);
  if (lang === 'ru') {
    const dateStr = date.toLocaleDateString('ru-RU', {
      month: 'long',
      day: 'numeric'
    });
    const weekdayStr = date.toLocaleDateString('ru-RU', {
      weekday: 'short',
    });
    return `${dateStr}, ${weekdayStr}`;
  } else {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  }
}

export const days = [...new Set(prog.map(p => p.start.split('T')[0]))].sort();

export const defaultFilter = {
  hidden: true,
  searchString: '',
  sections: [...Object.keys(tr.sectionNames.en)],
  types: [...Object.keys(tr.eventTypeNames.en)],
  days: days,
  display: 'list', //list, grid
  showAuthors: 'presenter', //presenter, coauthors, or none
  showAffs: false,
  showOnlyChecked: false,
  showOnlyCurrent: false
};
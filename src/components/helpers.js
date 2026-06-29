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
  sectionChairmen: {
    'plenary': [
      genSecCha('06-29T15:20', '06-29T18:00', 'Столярова В.Л., Гавричев К.С.', 'Stolyarova V.L., Gavrichev K.S.'),
      genSecCha('06-30T09:00', '06-30T11:55', 'Столярова В.Л., Хван А.В.', 'Stolyarova V.L., Khvan A.V.'),
      genSecCha('07-01T09:00', '07-01T11:00', 'Гавричев К.С., Цветков Д.С.', 'Gavrichev K.S., Tsvetkov D.S.'),
      genSecCha('07-02T09:00', '07-02T11:55', 'Верёвкин С.П., Будков Ю.А.', 'Verevkin S.P., Budkov Yu.A.'),
    ],
    'S1': [
      genSecCha('06-30T12:25', '06-30T13:25', 'Тойкка А.М., Зуев А.Ю.', 'Toikka A.M., Zuev A.Yu.'),
      genSecCha('06-30T14:30', '06-30T16:00', 'Будков Ю.А., Соломонов Б.Н.', 'Budkov Yu.A., Solomonov B.N.'),
      genSecCha('06-30T16:30', '06-30T18:00', 'Ягофаров М.И.', 'Yagofarov M.I.'),
    ],
    'S2': [
      genSecCha('06-30T12:25', '06-30T13:25', 'Беспятов М.А., Цветков Д.С.', 'Bespyatov M.A., Tsvetkov D.S.'),
      genSecCha('06-30T14:30', '06-30T16:00', 'Гавричев К.С., Биссенгалиева М.Р.', 'Gavrichev K.S., Bissengaliyeva M.R.'),
      genSecCha('06-30T16:30', '06-30T18:00', 'Гельфонд Н.В., Жерикова К.В.', 'Gelfond N.V., Zherikova K.V.'),
      genSecCha('07-02T12:25', '07-02T13:40', 'Горбачук В.В., Зуев А.Ю.', 'Gorbatchuk V.V., Zuev A.Yu.'),
    ],
    'S3': [
      genSecCha('06-30T12:25', '06-30T13:25', 'Киселёв М.Г., Опарин Р.Д.', 'Kiselev M.G., Oparin R.D.'),
      genSecCha('06-30T14:30', '06-30T16:00', 'Волков Н.А., Постников Е.Б.', 'Volkov N.A., Postnikov E.B.'),
      genSecCha('06-30T16:30', '06-30T18:00', 'Ткачёв Н.К., Сафонова Е.А.', 'Tkachev N.K., Safonova E.A.'),
    ],
    'S4': [
      genSecCha('06-30T12:25', '06-30T13:25', 'Черепанов В.А., Зеленина Л.Н.', 'Cherepanov V.A., Zelenina L.N.'),
      genSecCha('06-30T14:30', '06-30T16:00', 'Викторов А.И., Константинова Н.М.', 'Victorov A.I., Konstantinova N.M.'),
      genSecCha('06-30T16:30', '06-30T18:00', 'Верёвкин С.П.', 'Verevkin S.P.'),
      genSecCha('07-02T12:25', '07-02T13:40', 'Жерикова К.В., Черепанов В.А.', 'Zherikova K.V., Cherepanov V.A.'),
    ],
    'S5': [],
    'S6': [
      genSecCha('06-30T12:25', '06-30T13:25', 'Горбачук В.В., Красилин А.А.', 'Gorbatchuk V.V., Krasilin A.A.'),
      genSecCha('06-30T14:30', '06-30T16:00', 'Маркин А.В., Середа В.В.', 'Markin A.V., Sereda V.V.'),
      genSecCha('06-30T16:30', '06-30T18:00', 'Мовенко Д.А., Мазурин М.О.', 'Movenko D.A., Mazurin M.O.'),
    ],
    'S7': [],
    'S8': [],
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
      day: 'numeric',
      timeZone: 'Asia/Yekaterinburg'
    });
    const weekdayStr = date.toLocaleDateString('ru-RU', {
      weekday: 'short',
      timeZone: 'Asia/Yekaterinburg'
    });
    return `${dateStr}, ${weekdayStr}`;
  } else {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Yekaterinburg'
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

function genSecCha(start, end, ru, en) {
  //start and end are, e.g., 07-03T10:50
  return {
    start: `2026-${start}:00`,
    end: `2026-${end}:00`,
    ru: ru,
    en: en,
  }
}
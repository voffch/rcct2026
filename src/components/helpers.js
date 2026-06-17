import prog from './prog.json';

export const sectionTranslationsEn = {
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
};

export const presentationTypesTranslationsEn = {
  'plenary': 'Plenary Lectures',
  'key': 'Key Lectures',
  'oral': 'Oral Presentations',
  'poster': 'Poster Presentations',
  'event': 'Events'
};

export function translateDateEn(isoDateString) {
  const date = new Date(isoDateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',  // 'Monday'
    month: 'long',    // 'June'
    day: 'numeric'    // '29'
  });
}

const days = [...new Set(prog.map(p => p.start.split('T')[0]))].sort();

export const defaultFilter = {
  hidden: true,
  searchString: '',
  sections: [...Object.keys(sectionTranslationsEn)],
  types: [...Object.keys(presentationTypesTranslationsEn)],
  days: days,
  display: 'list', //list, grid
  showAuthors: 'presenter', //presenter, coauthors, or none
  showAffs: false,
  showOnlyChecked: false
};
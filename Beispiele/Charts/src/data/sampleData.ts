import type {
  CategoryValue,
  ProgressGoal,
  ShareSlice,
  TimeSeriesSeries,
} from './types';

/** Einschreibungen pro Monat – zwei Studiengänge */
export const enrollmentTrend: TimeSeriesSeries[] = [
  {
    id: 'informatik',
    label: 'Informatik',
    points: [
      { date: '2025-01-01', value: 820 },
      { date: '2025-02-01', value: 845 },
      { date: '2025-03-01', value: 910 },
      { date: '2025-04-01', value: 935 },
      { date: '2025-05-01', value: 960 },
      { date: '2025-06-01', value: 988 },
    ],
  },
  {
    id: 'design',
    label: 'Mediendesign',
    points: [
      { date: '2025-01-01', value: 410 },
      { date: '2025-02-01', value: 425 },
      { date: '2025-03-01', value: 440 },
      { date: '2025-04-01', value: 452 },
      { date: '2025-05-01', value: 468 },
      { date: '2025-06-01', value: 475 },
    ],
  },
];

/** Durchschnittliche Modulbewertungen nach Fachbereich (Schweizer Notenskala 1–6) */
export const moduleGrades: CategoryValue[] = [
  { category: 'Mathematik', value: 4.5, unit: 'Note' },
  { category: 'Programmierung', value: 5.2, unit: 'Note' },
  { category: 'UX Design', value: 5.5, unit: 'Note' },
  { category: 'Projektmanagement', value: 4.3, unit: 'Note' },
  { category: 'Englisch', value: 4.8, unit: 'Note' },
];

/** Wöchentliche Lernzeit nach Aktivität */
export const learningTimeShares: ShareSlice[] = [
  { label: 'Vorlesungen', value: 12, unit: 'Std.' },
  { label: 'Übungen', value: 8, unit: 'Std.' },
  { label: 'Selbststudium', value: 18, unit: 'Std.' },
  { label: 'Gruppenarbeit', value: 6, unit: 'Std.' },
  { label: 'Prüfungsvorbereitung', value: 4, unit: 'Std.' },
];

/** Fortschritt beim Abschlussprojekt */
export const thesisProgress: ProgressGoal = {
  title: 'Abschlussprojekt',
  currentValue: 72,
  minValue: 0,
  maxValue: 100,
  sublabel: 'Zielerreichung',
  segments: [
    { label: 'Recherche', size: 20 },
    { label: 'Implementierung', size: 40 },
    { label: 'Dokumentation', size: 25 },
    { label: 'Präsentation', size: 15 },
  ],
};

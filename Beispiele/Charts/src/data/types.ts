/** Domänentypen – unabhängig von Fluent UI Chart-APIs */

export interface TimeSeriesPoint {
  /** ISO-Datum, z. B. "2025-03-01" */
  date: string;
  value: number;
}

export interface TimeSeriesSeries {
  id: string;
  label: string;
  points: TimeSeriesPoint[];
}

export interface CategoryValue {
  category: string;
  value: number;
  unit?: string;
}

export interface ShareSlice {
  label: string;
  value: number;
  unit?: string;
}

export interface ProgressGoal {
  title: string;
  currentValue: number;
  minValue: number;
  maxValue: number;
  sublabel?: string;
  segments: ProgressSegment[];
}

export interface ProgressSegment {
  label: string;
  size: number;
}

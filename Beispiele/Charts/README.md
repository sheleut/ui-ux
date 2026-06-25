# Fluent UI Charts – Beispiel-Dashboard

React-Dashboard für Studierende mit Line-, Bar-, Donut- und Gauge-Charts.  
Daten, Mapping und Darstellung sind bewusst getrennt – erweiterbar für Lehrzwecke.

## Tech Stack

- React + TypeScript (Vite)
- `@fluentui/react-components` – Layout und UI
- `@fluentui/react-charting` – Chart-Komponenten
- `@fluentui/react` – Peer-Dependency der Chart-Bibliothek (Icons)

## Projektstruktur

```
src/
├── data/
│   ├── types.ts        # Domänentypen (ohne Fluent-UI-Abhängigkeit)
│   └── sampleData.ts   # Beispieldaten
├── mappers/
│   └── chartMappers.ts # Übersetzung: Domäne → Fluent-UI-Chart-APIs
└── components/
    ├── ChartCard.tsx   # Wiederverwendbare Karten-Hülle
    ├── Dashboard.tsx   # Seitenlayout
    └── charts/         # Eine Komponente pro Chart-Typ
```

## Starten

```bash
npm install
npm run dev
```

Build prüfen:

```bash
npm run build
```

## Neuen Chart hinzufügen (Schritt für Schritt)

### 1. Domänentyp definieren (`src/data/types.ts`)

Neuen Typ anlegen, der die fachliche Bedeutung beschreibt – unabhängig von Fluent UI:

```typescript
export interface ExamResult {
  subject: string;
  score: number;
  maxScore: number;
}
```

### 2. Beispieldaten ergänzen (`src/data/sampleData.ts`)

Datensatz mit dem neuen Typ exportieren:

```typescript
import type { ExamResult } from './types';

export const examResults: ExamResult[] = [
  { subject: 'Statistik', score: 18, maxScore: 20 },
  { subject: 'Datenbanken', score: 15, maxScore: 20 },
];
```

### 3. Mapper schreiben (`src/mappers/chartMappers.ts`)

Funktion, die Domänendaten in Fluent-UI-Chart-Props übersetzt:

```typescript
export function mapToExamBarChartPoints(
  results: ExamResult[],
): IHorizontalBarChartWithAxisDataPoint[] {
  return results.map((item, index) => ({
    y: item.subject,
    x: item.score,
    legend: item.subject,
    color: getColorFromToken(BAR_COLORS[index % BAR_COLORS.length]!),
    xAxisCalloutData: `${item.score} / ${item.maxScore}`,
  }));
}
```

### 4. Chart-Komponente erstellen (`src/components/charts/ExamChartCard.tsx`)

Daten importieren, per `useMemo` mappen, Chart rendern:

```typescript
import { useMemo } from 'react';
import { HorizontalBarChartWithAxis } from '@fluentui/react-charting';
import { examResults } from '../../data/sampleData';
import { mapToExamBarChartPoints } from '../../mappers/chartMappers';
import { ChartCard } from '../ChartCard';

export function ExamChartCard() {
  const data = useMemo(() => mapToExamBarChartPoints(examResults), []);

  return (
    <ChartCard title="Prüfungsergebnisse" description="…">
      <HorizontalBarChartWithAxis data={data} enableReflow height={260} />
    </ChartCard>
  );
}
```

### 5. Im Dashboard einbinden (`src/components/Dashboard.tsx`)

Neue Card importieren und in einer Sektion platzieren:

```typescript
import { ExamChartCard } from './charts/ExamChartCard';

// …
<ExamChartCard />
```

## Hinweise für Lehrende

| Schicht | Verantwortung | Beispiel |
|---|---|---|
| **Daten** | Was bedeuten die Werte? | `moduleGrades`, `learningTimeShares` |
| **Mapper** | Wie werden sie chart-kompatibel? | `mapToHorizontalBarChartPoints` |
| **Darstellung** | Wie sieht es aus? | `BarChartCard`, `ChartCard` |

- **Bar Chart:** `HorizontalBarChartWithAxis` mit `y: string` zeigt echte Kategorienamen auf der Y-Achse. `showYAxisLables` aktiviert die automatische Berechnung des linken Randes; `xMinValue`/`tickValues` nicht setzen – die Balken-Skala startet intern bei 0.
- **Donut Chart:** `mapToDonutChartProps` liefert `{ data, total }` – die Summe wird nicht hardcodiert.
- **Gauge Chart:** `mapToGaugeChartProps` mappt alle relevanten Props aus `ProgressGoal`.
- **Einheiten:** optional über `unit` in `CategoryValue` und `ShareSlice` – im Mapper für Tooltips nutzen.

import { useMemo } from 'react';
import { HorizontalBarChartWithAxis } from '@fluentui/react-charting';

import { moduleGrades } from '../../data/sampleData';
import { mapToHorizontalBarChartPoints } from '../../mappers/chartMappers';
import { ChartCard } from '../ChartCard';

export function BarChartCard() {
  const barChartPoints = useMemo(
    () => mapToHorizontalBarChartPoints(moduleGrades),
    [],
  );

  return (
    <ChartCard
      title="Bar Chart"
      description="Vergleich der Modulnoten nach Fachbereich (Schweizer Skala: 6 = sehr gut, 4 = genügend)."
      chartMinHeight={320}
    >
      <HorizontalBarChartWithAxis
        data={barChartPoints}
        enableReflow
        showYAxisLables
        hideLegend
        hideLabels
        xMaxValue={6}
        xAxisTitle="Note"
        xAxisTickCount={4}
        height={320}
        barHeight={32}
        margins={{ bottom: 48 }}
      />
    </ChartCard>
  );
}

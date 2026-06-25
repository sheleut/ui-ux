import { useMemo } from 'react';
import { LineChart } from '@fluentui/react-charting';

import { enrollmentTrend } from '../../data/sampleData';
import { mapToLineChartProps } from '../../mappers/chartMappers';
import { ChartCard } from '../ChartCard';

export function LineChartCard() {
  const lineChartData = useMemo(
    () => mapToLineChartProps(enrollmentTrend, 'Einschreibungen im Semesterverlauf'),
    [],
  );

  return (
    <ChartCard
      title="Line Chart"
      description="Zeitliche Entwicklung der Einschreibungen in zwei Studiengängen."
    >
      <LineChart
        data={lineChartData}
        enableReflow
        yAxisTitle="Studierende"
        xAxisTitle="Monat"
        height={260}
      />
    </ChartCard>
  );
}

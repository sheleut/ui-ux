import { useMemo } from 'react';
import { GaugeChart } from '@fluentui/react-charting';

import { thesisProgress } from '../../data/sampleData';
import { mapToGaugeChartProps } from '../../mappers/chartMappers';
import { ChartCard } from '../ChartCard';

export function GaugeChartCard() {
  const gaugeProps = useMemo(() => mapToGaugeChartProps(thesisProgress), []);

  return (
    <ChartCard
      title="Gauge Chart"
      description="Fortschritt und Zielerreichung beim Abschlussprojekt."
    >
      <GaugeChart
        {...gaugeProps}
        width={320}
        height={180}
      />
    </ChartCard>
  );
}

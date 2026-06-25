import { useMemo } from 'react';
import { DonutChart } from '@fluentui/react-charting';

import { learningTimeShares } from '../../data/sampleData';
import { mapToDonutChartProps } from '../../mappers/chartMappers';
import { ChartCard } from '../ChartCard';

export function DonutChartCard() {
  const { data: donutChartData, total } = useMemo(
    () => mapToDonutChartProps(learningTimeShares, 'Lernzeit nach Aktivität'),
    [],
  );

  return (
    <ChartCard
      title="Donut Chart"
      description="Anteile der wöchentlichen Lernzeit in Stunden."
    >
      <DonutChart
        data={donutChartData}
        innerRadius={55}
        height={260}
        valueInsideDonut={total}
      />
    </ChartCard>
  );
}

import {
  DataVizPalette,
  getColorFromToken,
  type IChartDataPoint,
  type IChartProps,
  type IGaugeChartProps,
  type IGaugeChartSegment,
  type IHorizontalBarChartWithAxisDataPoint,
  type ILineChartPoints,
} from '@fluentui/react-charting';

import type {
  CategoryValue,
  ProgressGoal,
  ShareSlice,
  TimeSeriesSeries,
} from '../data/types';

const LINE_COLORS = [
  DataVizPalette.color1,
  DataVizPalette.color2,
  DataVizPalette.color3,
  DataVizPalette.color4,
];

const BAR_COLORS = [
  DataVizPalette.color1,
  DataVizPalette.color2,
  DataVizPalette.color3,
  DataVizPalette.color4,
  DataVizPalette.color5,
];

const DONUT_COLORS = [
  DataVizPalette.color1,
  DataVizPalette.color2,
  DataVizPalette.color3,
  DataVizPalette.color4,
  DataVizPalette.color5,
];

const GAUGE_COLORS = [
  DataVizPalette.color1,
  DataVizPalette.color2,
  DataVizPalette.color3,
  DataVizPalette.color4,
];

export interface MappedDonutChart {
  data: IChartProps;
  total: number;
}

export type MappedGaugeChartProps = Pick<
  IGaugeChartProps,
  'chartTitle' | 'chartValue' | 'minValue' | 'maxValue' | 'sublabel' | 'segments'
>;

export function mapToLineChartProps(
  series: TimeSeriesSeries[],
  chartTitle: string,
): IChartProps {
  const lineChartData: ILineChartPoints[] = series.map((item, index) => ({
    legend: item.label,
    color: LINE_COLORS[index % LINE_COLORS.length],
    data: item.points.map((point) => ({
      x: new Date(`${point.date}T00:00:00`),
      y: point.value,
    })),
    lineOptions: { lineBorderWidth: '3' },
  }));

  return { chartTitle, lineChartData };
}

export function mapToHorizontalBarChartPoints(
  categories: CategoryValue[],
): IHorizontalBarChartWithAxisDataPoint[] {
  return categories.map((item, index) => ({
    y: item.category,
    x: item.value,
    legend: item.category,
    color: getColorFromToken(BAR_COLORS[index % BAR_COLORS.length]!),
    xAxisCalloutData: item.unit ? `${item.value} (${item.unit})` : String(item.value),
    yAxisCalloutData: item.category,
  }));
}

export function sumShareValues(slices: ShareSlice[]): number {
  return slices.reduce((total, slice) => total + slice.value, 0);
}

export function mapToDonutChartProps(
  slices: ShareSlice[],
  chartTitle: string,
): MappedDonutChart {
  const chartData: IChartDataPoint[] = slices.map((slice, index) => {
    const unit = slice.unit ?? '';
    const valueLabel = unit ? `${slice.value} ${unit}` : String(slice.value);

    return {
      legend: slice.label,
      data: slice.value,
      color: getColorFromToken(DONUT_COLORS[index % DONUT_COLORS.length]!),
      xAxisCalloutData: slice.label,
      yAxisCalloutData: valueLabel,
    };
  });

  return {
    data: { chartTitle, chartData },
    total: sumShareValues(slices),
  };
}

export function mapToGaugeChartProps(goal: ProgressGoal): MappedGaugeChartProps {
  const segments: IGaugeChartSegment[] = goal.segments.map((segment, index) => ({
    legend: segment.label,
    size: segment.size,
    color: getColorFromToken(GAUGE_COLORS[index % GAUGE_COLORS.length]!),
  }));

  return {
    chartTitle: goal.title,
    chartValue: goal.currentValue,
    minValue: goal.minValue,
    maxValue: goal.maxValue,
    sublabel: goal.sublabel,
    segments,
  };
}

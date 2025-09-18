export interface WeekData {
  week: number;
  fchValue: number;
  beforeValue: number;
  total: number;
}

export interface ModelTypeData {
  model: string; // '45X', 'P4', 'GENERAL'
  type: string;  // 'InLine', 'OutLine'
  weeks: WeekData[];
}

export interface ChartData {
  modelTypeData: ModelTypeData[];
  selectedOu: string; // 'FCH/BEFORE' or individual values
}

export interface TrendLineData {
  week: number;
  trendValue: number;
}

export interface StackedChartConfig {
  title: string;
  fchValues: number[];
  beforeValues: number[];
  trendLine: TrendLineData[];
  weeks: number[];
}
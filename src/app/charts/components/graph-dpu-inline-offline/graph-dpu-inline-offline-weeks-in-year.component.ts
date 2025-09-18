import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as echarts from 'echarts';
import { ChartData, ModelTypeData, WeekData, TrendLineData, StackedChartConfig } from '../../interfaces/chart-data.interface';

@Component({
  selector: 'app-graph-dpu-inline-offline-weeks-in-year',
  templateUrl: './graph-dpu-inline-offline-weeks-in-year.component.html',
  styleUrls: ['./graph-dpu-inline-offline-weeks-in-year.component.css']
})
export class GraphDpuInLineAndOfflineWeeksInYearComponent implements OnInit, AfterViewInit {
  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;

  // Updated ouGroups from ['FCH', 'BEF'] to ['FCH', 'BEFORE'] to match backend data
  ouGroups = ['FCH', 'BEFORE'];
  selectedOu = 'FCH/BEFORE';
  
  chartData: ChartData = {
    modelTypeData: [],
    selectedOu: 'FCH/BEFORE'
  };
  
  private charts: echarts.ECharts[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadSampleData();
  }

  ngAfterViewInit(): void {
    this.generateEcharts();
  }

  /**
   * Load sample data for testing
   */
  private loadSampleData(): void {
    const models = ['45X', 'P4', 'GENERAL'];
    const types = ['InLine', 'OutLine'];
    
    this.chartData.modelTypeData = [];
    
    models.forEach(model => {
      types.forEach(type => {
        const weeks: WeekData[] = [];
        
        // Generate sample data for 52 weeks
        for (let week = 1; week <= 52; week++) {
          const fchValue = Math.floor(Math.random() * 100) + 50;
          const beforeValue = Math.floor(Math.random() * 80) + 30;
          
          weeks.push({
            week,
            fchValue,
            beforeValue,
            total: fchValue + beforeValue
          });
        }
        
        this.chartData.modelTypeData.push({
          model,
          type,
          weeks
        });
      });
    });
  }

  /**
   * Generate ECharts based on selected OU
   * In FCH/BEFORE mode, generate stacked charts for each model-type combination
   */
  generateEcharts(): void {
    if (!this.chartContainer) return;
    
    // Clear existing charts
    this.charts.forEach(chart => chart.dispose());
    this.charts = [];
    
    if (this.selectedOu === 'FCH/BEFORE') {
      this.generateStackedCharts();
    } else {
      this.generateSeparateCharts();
    }
  }

  /**
   * Generate stacked charts for FCH/BEFORE mode
   */
  private generateStackedCharts(): void {
    const container = this.chartContainer.nativeElement;
    container.innerHTML = '';
    
    this.chartData.modelTypeData.forEach((modelData, index) => {
      const chartDiv = document.createElement('div');
      chartDiv.style.width = '100%';
      chartDiv.style.height = '400px';
      chartDiv.style.marginBottom = '20px';
      container.appendChild(chartDiv);
      
      const config = this.prepareStackedChartConfig(modelData);
      const options = this.buildStackedChartOptions(config);
      
      const chart = echarts.init(chartDiv);
      chart.setOption(options);
      this.charts.push(chart);
    });
  }

  /**
   * Generate separate charts for individual OU selection
   */
  private generateSeparateCharts(): void {
    // Implementation for separate charts (existing functionality)
    // This would be the original implementation for individual OU selection
    console.log('Generating separate charts for:', this.selectedOu);
  }

  /**
   * Prepare data configuration for stacked chart
   */
  private prepareStackedChartConfig(modelData: ModelTypeData): StackedChartConfig {
    const weeks = modelData.weeks.map(w => w.week);
    const fchValues = modelData.weeks.map(w => w.fchValue);
    const beforeValues = modelData.weeks.map(w => w.beforeValue);
    const totals = modelData.weeks.map(w => w.total);
    
    // Calculate linear regression for trend line
    const trendLine = this.calculateTrendLine(weeks, totals);
    
    return {
      title: `${modelData.model} - ${modelData.type}`,
      fchValues,
      beforeValues,
      trendLine,
      weeks
    };
  }

  /**
   * Build ECharts options for stacked bar chart
   */
  buildStackedChartOptions(config: StackedChartConfig): any {
    return {
      title: {
        text: config.title,
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: (params: any[]) => {
          let tooltip = `Week ${params[0].axisValue}<br/>`;
          let total = 0;
          
          params.forEach(param => {
            if (param.seriesType === 'bar') {
              tooltip += `${param.seriesName}: ${param.value}<br/>`;
              total += param.value;
            } else if (param.seriesType === 'line') {
              tooltip += `${param.seriesName}: ${param.value.toFixed(2)}<br/>`;
            }
          });
          
          if (total > 0) {
            tooltip += `<strong>Total: ${total}</strong>`;
          }
          
          return tooltip;
        }
      },
      legend: {
        data: ['FCH', 'BEFORE', 'Tendencia'],
        top: '10%'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: config.weeks,
        name: 'Semana',
        nameLocation: 'middle',
        nameGap: 30
      },
      yAxis: {
        type: 'value',
        name: 'Valores',
        nameLocation: 'middle',
        nameGap: 50
      },
      series: [
        {
          name: 'FCH',
          type: 'bar',
          stack: 'total',
          data: config.fchValues,
          itemStyle: {
            color: '#3b82f6' // Blue color for FCH
          },
          label: {
            show: true,
            position: 'inside',
            formatter: '{c}',
            color: '#fff',
            fontSize: 10
          }
        },
        {
          name: 'BEFORE',
          type: 'bar',
          stack: 'total',
          data: config.beforeValues,
          itemStyle: {
            color: '#10b981' // Green color for BEFORE
          },
          label: {
            show: true,
            position: 'inside',
            formatter: '{c}',
            color: '#fff',
            fontSize: 10
          }
        },
        {
          name: 'Tendencia',
          type: 'line',
          data: config.trendLine.map(t => t.trendValue),
          itemStyle: {
            color: '#ef4444' // Red color for trend line
          },
          lineStyle: {
            width: 2,
            type: 'dashed'
          },
          symbol: 'circle',
          symbolSize: 4
        }
      ]
    };
  }

  /**
   * Calculate linear regression trend line
   */
  private calculateTrendLine(weeks: number[], totals: number[]): TrendLineData[] {
    const n = weeks.length;
    const sumX = weeks.reduce((a, b) => a + b, 0);
    const sumY = totals.reduce((a, b) => a + b, 0);
    const sumXY = weeks.reduce((sum, x, i) => sum + x * totals[i], 0);
    const sumXX = weeks.reduce((sum, x) => sum + x * x, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    return weeks.map(week => ({
      week,
      trendValue: slope * week + intercept
    }));
  }

  /**
   * Handle OU selection change
   */
  onOuSelectionChange(selectedOu: string): void {
    this.selectedOu = selectedOu;
    this.chartData.selectedOu = selectedOu;
    this.generateEcharts();
  }

  /**
   * Handle window resize
   */
  onResize(): void {
    this.charts.forEach(chart => chart.resize());
  }
}
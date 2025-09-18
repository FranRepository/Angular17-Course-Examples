import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { GraphDpuInLineAndOfflineWeeksInYearComponent } from './graph-dpu-inline-offline-weeks-in-year.component';

describe('GraphDpuInLineAndOfflineWeeksInYearComponent', () => {
  let component: GraphDpuInLineAndOfflineWeeksInYearComponent;
  let fixture: ComponentFixture<GraphDpuInLineAndOfflineWeeksInYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraphDpuInLineAndOfflineWeeksInYearComponent],
      imports: [FormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraphDpuInLineAndOfflineWeeksInYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial selectedOu as FCH/BEFORE', () => {
    expect(component.selectedOu).toBe('FCH/BEFORE');
  });

  it('should have ouGroups with FCH and BEFORE', () => {
    expect(component.ouGroups).toEqual(['FCH', 'BEFORE']);
  });

  it('should generate sample data with 6 model-type combinations', () => {
    expect(component.chartData.modelTypeData.length).toBe(6);
  });

  it('should have data for all models and types', () => {
    const modelTypes = component.chartData.modelTypeData.map(mt => `${mt.model}-${mt.type}`);
    expect(modelTypes).toContain('45X-InLine');
    expect(modelTypes).toContain('45X-OutLine');
    expect(modelTypes).toContain('P4-InLine');
    expect(modelTypes).toContain('P4-OutLine');
    expect(modelTypes).toContain('GENERAL-InLine');
    expect(modelTypes).toContain('GENERAL-OutLine');
  });

  it('should generate 52 weeks of data for each model-type', () => {
    component.chartData.modelTypeData.forEach(mt => {
      expect(mt.weeks.length).toBe(52);
    });
  });

  it('should call generateEcharts when OU selection changes', () => {
    spyOn(component, 'generateEcharts');
    component.onOuSelectionChange('FCH');
    expect(component.selectedOu).toBe('FCH');
    expect(component.generateEcharts).toHaveBeenCalled();
  });

  it('should calculate trend line correctly', () => {
    const weeks = [1, 2, 3, 4, 5];
    const totals = [10, 20, 30, 40, 50];
    const trendLine = (component as any).calculateTrendLine(weeks, totals);
    
    expect(trendLine.length).toBe(5);
    expect(trendLine[0].week).toBe(1);
    expect(trendLine[4].week).toBe(5);
    // Linear regression should show an increasing trend
    expect(trendLine[4].trendValue).toBeGreaterThan(trendLine[0].trendValue);
  });
});
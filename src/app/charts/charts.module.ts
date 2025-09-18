import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GraphDpuInLineAndOfflineWeeksInYearComponent } from './components/graph-dpu-inline-offline/graph-dpu-inline-offline-weeks-in-year.component';

@NgModule({
  declarations: [
    GraphDpuInLineAndOfflineWeeksInYearComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    GraphDpuInLineAndOfflineWeeksInYearComponent
  ]
})
export class ChartsModule { }
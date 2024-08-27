import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MainPageComponent  } from './pages/main-page.component';
import { ListComponent } from './components/list/list.component';
import { AddCharacterComponent } from './components/addCharacter/addCharacter.component';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CounterModule } from "../counter/counter.module";
import { HeroesModule } from "../heroes/heroes.module";

@NgModule({
  declarations: [MainPageComponent, ListComponent, AddCharacterComponent],
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
    BrowserAnimationsModule,
    CounterModule,
    HeroesModule
],
  exports: [
    MainPageComponent
  ]
})
export class DbzModule { }

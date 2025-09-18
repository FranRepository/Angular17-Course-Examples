import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { CounterModule } from './counter/counter.module';
 import { AppComponent } from './app.component';
 import { HeroesModule } from './heroes/heroes.module';
 import { DbzModule } from './dbz/dbz.module';
 import { CalendarModule } from 'primeng/calendar';
 import { ChartsModule } from './charts/charts.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    CounterModule,
    HeroesModule,
    CalendarModule,
    DbzModule,
    ChartsModule,

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

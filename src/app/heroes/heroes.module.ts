//Angular Module Authors
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
//components personalizations
import { ListaComponent } from "./list/list.component";
import { HeroComponent } from "./hero/hero.component";


@NgModule({
  declarations: [
    HeroComponent,
    ListaComponent,
  ],
  exports: [
    HeroComponent,
    ListaComponent,
  ],
  imports: [
    CommonModule,
  ],
})

export class HeroesModule{

}

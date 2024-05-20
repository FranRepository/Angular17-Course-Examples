import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListaComponent {

  public heroNames:String[] = ['Superman','Batman','Wonder woman','Flash','Cyborg','Green Arrow'];
  public deletedHero?:String;


  removeLastHero():void {
     this.deletedHero=  this.heroNames.pop();
    // console.log(deletedHero);
  }

}

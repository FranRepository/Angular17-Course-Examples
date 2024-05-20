
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
 <h2>Counter: {{counter}}</h2>
 <hr>
 <button (click)="Ingresedby(-1)">-1</button>
 <button (click)="Reset()">RESET</button>
 <button (click)="Ingresedby(+1)">+1</button>
 <hr>
  `
})

export class CounterComponent  {
  constructor() { }
  counter = 1;

  Ingresedby(value: number):void {
    this.counter= this.counter + value;

  }
  Reset ():void {
    this.counter = 10;
  }

}

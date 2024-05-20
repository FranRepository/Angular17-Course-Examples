import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

   public name: string="Batman";
   public realName: string="Bruce Wayne";
   public age: number= 30;
   public power: string= "Super Rich";

   get capitalizedName(): string {
     return this.name.toUpperCase();
   }

   get cammelCaseName(): string {
     return this.name.charAt(0).toUpperCase() + this.name.slice(1);
  }

   getHeroDescription(): string {
     return `${this.cammelCaseName} is ${this.age} years old and has ${this.power}`;

   }

   changeHero(): void {
    //TODO:
      this.name = "Superman";
      this.realName = "Clark Kent";
      this.power = "Super Force";
   }

   changeAge(age: number): void {
    this.age = age;
  }

  resetForm(): void {
    this.name = "Batman";
    this.realName = "Bruce Wayne";
    this.age = 30;
    this.power = "Super Rich";
  }
}

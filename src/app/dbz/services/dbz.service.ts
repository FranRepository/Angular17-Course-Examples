import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character.interface';
import{v4 as uuid} from 'uuid';

// console.log(uuid());

@Injectable({
  providedIn: 'root'
})
export class DbzService {
  public characters: Character[] = [{
    id: uuid(),
    name: 'Goku',
    power: 9080
  },{
    id: uuid(),
    name: 'Vegeta',
    power: 9000
  }, {
    id: uuid(),
    name: 'Krillin',
    power: 1000
  }, {
    id: uuid(),
    name: 'Gohan',
    power: 9990
  },{
      id: uuid(),
      name:'Piccolo',
      power: 70000
    },{
      id: uuid(),
      name:'Gotens',
      power:8555
    },{
    id: uuid(),
    name:'Bills',
    power : 1000
    }
  ];

  addCharacter(character: Character): void {
    const newCharacter: Character = {
       ...character
    };
    this.characters.push(newCharacter);
}


  DeleteCharacterById(id:string) {
    this.characters = this.characters.filter(character => character.id!==id);

}

}

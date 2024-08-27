import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';
import{v4 as uuid} from 'uuid';

@Component({
  selector: 'dbz-add-character',
  templateUrl: './addCharacter.component.html',
  styleUrl: './addCharacter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCharacterComponent {

  @Output()
  public onNewCharacterEmitted: EventEmitter<Character> = new EventEmitter();

  public character:Character={
    id:'',
    name: '',
    power: 0
  };

  emitCharacterChanged():void {

      if(this.character.name.length === 0) return;
      this.character.id =  uuid();
      this.onNewCharacterEmitted.emit(this.character);

      this.character={id:'',name: '', power:0};

  }

 }



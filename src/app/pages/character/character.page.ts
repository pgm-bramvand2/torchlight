import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-character',
  templateUrl: './character.page.html',
  styleUrls: ['./character.page.scss'],
})
export class CharacterPage implements OnInit {
  public attributes = [
    {
      name: 'strength',
      score: 21,
      mod: '+1',
      save: '+1'
    },
    {
      name: 'dexterity',
      score: 21,
      mod: '+1',
      save: '+1'
    },
    {
      name: 'constitution',
      score: 21,
      mod: '+1',
      save: '+1'
    },
    {
      name: 'intelligence',
      score: 21,
      mod: '+1',
      save: '+1'
    },
    {
      name: 'wisdom',
      score: 21,
      mod: '+1',
      save: '+1'
    },
    {
      name: 'charisma',
      score: 21,
      mod: '+1',
      save: '+1'
    }
  ];

  public senses = [
    {
      name: 'passive perception',
      score: 12
    },
    {
      name: 'passive investigation',
      score: 12
    },
    {
      name: 'insight',
      score: 12
    }
  ];

  tableHeader = 'header-dark';
  tableTheme = 'ion-border table-theme';

  constructor(

  ) { }

  ngOnInit() {
  }

  onChange(value) {
    console.log(value);
  }

}

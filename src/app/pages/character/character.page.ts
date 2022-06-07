import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-character',
  templateUrl: './character.page.html',
  styleUrls: ['./character.page.scss'],
})
export class CharacterPage implements OnInit {
  dataSource = [
    {
      username: 'freddy',
      age: 21,
      title: 'bossman'
    }
  ];

  constructor(

  ) { }

  ngOnInit() {
  }

  onChange(value) {
    console.log(value);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.page.html',
  styleUrls: ['./create-character.page.scss'],
})
export class CreateCharacterPage implements OnInit {
  characterForm = this.fb.group({
    name: [ '', [Validators.required, Validators.minLength(2), Validators.maxLength(100)] ],
    race: [ '', Validators.required ],
    description: [ '', [ Validators.minLength(2), Validators.maxLength(100)] ],
    class: [ '', Validators.required ],
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}

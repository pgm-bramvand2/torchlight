import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { pairwise, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.page.html',
  styleUrls: ['./create-character.page.scss'],
})
export class CreateCharacterPage implements OnInit {
  maxPoints = 27;
  usedPoints = 0;
  amountOfPoints = this.maxPoints - this.usedPoints;


  characterForm = this.fb.group({
    name: [ null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)] ],
    race: [ 'human', Validators.required ],
    description: [ null, [ Validators.minLength(2), Validators.maxLength(100)] ],
    class: [ 'fighter', Validators.required ],
    abilities: this.fb.group({
      strength: [ 8 , [Validators.required, Validators.max(16)]],
      dexterity: [ 8 , [Validators.required, Validators.max(16)]],
      constitution: [ 8 , [Validators.required, Validators.max(16)]],
      intelligence: [ 8 , [Validators.required, Validators.max(16)]],
      wisdom: [ 8 , [Validators.required, Validators.max(16)]],
      charisma: [ 8 , [Validators.required, Validators.max(16)]],
    }),
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.characterForm.get('race').valueChanges.pipe(
      // switchMap((value) => {
      // api call return this.apiservice.getraceinfo(value)
      // })
      tap(console.log)
    ).subscribe();

    const abilities = Object.keys(this.characterForm.value.abilities);
    abilities.forEach(ability => {
        this.handleAttr(ability);
    });
    // this.characterForm.controls.abilities.value.forEach(attribute => {
    // });
  }

  onChange() {
    // console.log(this.characterForm.value.strength);
  }

  handleAttr(control: string) {
    console.log(typeof control);
    this.characterForm.get(['abilities', control]).valueChanges.pipe(
      startWith(8),
      pairwise(),
      tap(console.log),
      tap(([current, previous]) => {

        const previousValue = previous || 8;
             if(current < previousValue) {
                if(current < 13 ) {
                  this.amountOfPoints--;
                } else {
                  this.amountOfPoints-=2;
                }
             } else {
              if(current <= 13) {
                this.amountOfPoints++;
              } else {
                this.amountOfPoints+=2;
              }

              return;
             };
      })
    ).subscribe();
  }

  adjustAbility(action: string, ability: string) {
    const abilityScore = this.characterForm.get(['abilities', ability]);
    const abilityScoreValue = abilityScore.value;
    if(action === 'increase') {
      abilityScore.setValue(abilityScoreValue + 1);
    } else {
      abilityScore.setValue(abilityScoreValue - 1);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { pairwise, startWith, tap, switchMap } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { FirebaseStorageService } from 'src/app/shared/services/firebase/firebase-storage/firebase-storage.service';
import { FirestoreService } from 'src/app/shared/services/firebase/firestore/firestore.service';
import { LocalstorageService } from 'src/app/shared/services/localstorage/localstorage.service';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.page.html',
  styleUrls: ['./create-character.page.scss'],
})
export class CreateCharacterPage implements OnInit {
  maxPoints = 27;
  usedPoints = 0;
  amountOfPoints = this.maxPoints - this.usedPoints;
  user;
  profAmount;
  profChoices;
  confirmed: string;

  abilityNames = [
    {
      index: 'str',
      name: 'Strength'
    },
    {
      index: 'dex',
      name: 'Dexterity'
    },
    {
      index: 'con',
      name: 'Constitution'
    },
    {
      index: 'int',
      name: 'Intelligence'
    },
    {
      index: 'wis',
      name: 'Wisdom'
    },
    {
      index: 'cha',
      name: 'Charisma'
    },
  ];


  characterForm = this.fb.group({
    // avatarUrl: [null, Validators.required],
    userId: [null, Validators.required],
    level: [1, Validators.required],
    totalHp: [null, Validators.required],
    speed: [null, Validators.required],
    name: [ null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)] ],
    race: [ null, Validators.required ],
    description: [ '', [ Validators.minLength(2), Validators.maxLength(100)] ],
    class: [ null, Validators.required ],
    abilities: this.fb.group({
      str: [ 8 , [Validators.required, Validators.max(16)]],
      dex: [ 8 , [Validators.required, Validators.max(16)]],
      con: [ 8 , [Validators.required, Validators.max(16)]],
      int: [ 8 , [Validators.required, Validators.max(16)]],
      wis: [ 8 , [Validators.required, Validators.max(16)]],
      cha: [ 8 , [Validators.required, Validators.max(16)]],
    }),
    abilityBonuses: [[]],
    proficiencies: [[], [Validators.required]],
  });
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private fireStorageService: FirebaseStorageService,
    private localStorageService: LocalstorageService,
    private firestoreService: FirestoreService,
    private alertController: AlertController,
    private router: Router
    ) { }

  ngOnInit() {
    const user = this.localStorageService.getStorageItem('user');
    this.characterForm.get('userId').setValue(user.uid);

    this.characterForm.get('race').valueChanges.pipe(
      switchMap((value) => this.apiService.getCharacterRace(value)),
      ).subscribe((raceData: any) => {
        this.characterForm.get('speed').setValue(raceData.speed, { emitEvent: false });
        const bonuses = raceData.ability_bonuses;

        const abilityBonuses = this.characterForm.get('abilityBonuses');
        abilityBonuses.setValue([]);

        if(bonuses) {
          bonuses.forEach((bonus) => {
            const abilityBonus = {
              index: bonus.ability_score.index,
              bonus: bonus.bonus
            };

          abilityBonuses.setValue([abilityBonus, ...abilityBonuses.value]);
          });
        }
    });

    this.characterForm.get('class').valueChanges.pipe(
      switchMap((value) => this.apiService.getCharacterClass(value)),
    ).subscribe((classData: any) => {
      this.characterForm.get('proficiencies').setValue([]);
      this.characterForm.get('totalHp').setValue(classData.hit_die, { emitEvent: false });

      this.profAmount = classData.proficiency_choices[0].choose;
      this.profChoices = classData.proficiency_choices[0].from.options;
    });

    const abilities = Object.keys(this.characterForm.value.abilities);
    abilities.forEach(ability => {
        this.handleAttr(ability);
    });
  }

  checkChoicesAmount(item: string) {
    const formControlValue = this.characterForm.get('proficiencies').value;

    if(formControlValue.length >= this.profAmount && !formControlValue.includes(item)) {
      return true;
    }
    return false;
  }

  handleAttr(control: string): void {
    this.characterForm.get(['abilities', control]).valueChanges.pipe(
      startWith(8),
      pairwise(),
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

  adjustAbility(action: string, ability: string): void {
    const abilityScore = this.characterForm.get(['abilities', ability]);
    const abilityScoreValue = abilityScore.value;
    if(action === 'increase') {
      abilityScore.setValue(abilityScoreValue + 1);
    } else {
      abilityScore.setValue(abilityScoreValue - 1);
    }
  }

  checkForBonus(ability: string): null | number {
    const check = this.characterForm.get('abilityBonuses').value.find((bonus) => bonus.index === ability );
    if(check) {
      return check.bonus;
    }

    return null;
  }

  calcAbilityTotal(abilityIndex): number {
    const bonus = this.checkForBonus(abilityIndex);
    const score = this.characterForm.get(['abilities', abilityIndex]).value;
    if(bonus) {
      return score + bonus;
    }
    return score;
  }

  addBonusesToAbilityScores(): void {
    const bonuses = this.characterForm.get('abilityBonuses').value;
    bonuses.forEach((bonus) => {
      const ability = this.characterForm.get(['abilities', bonus.index]);
      ability.setValue(ability.value + bonus.bonus, { emitEvent: false });
    });
  }

  onImagePick(imageData: string) {
    this.fireStorageService.uploadData('images', imageData);
  }

  navigateBack() {
   this.router.navigate(['characters']);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Complete creation?',
      message: 'Do you want to create this character?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
        },
      ],
    });

    await alert.present();
    await alert.onDidDismiss().then((data) => {
      this.confirmed= data.role;
    });
  }

  async onSubmit() {
    await this.presentAlertConfirm();

    if(this.confirmed === 'confirm') {
      this.addBonusesToAbilityScores();
      this.firestoreService.createCharacter(this.characterForm.value);
      this.router.navigate(['characters']);
    }


    console.log(this.characterForm.value);
  }
}

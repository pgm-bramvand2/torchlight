import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
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
  // Maximum points in the point pool
  maxPoints = 27;
  // Keep track of the used points in the point pool
  usedPoints = 0;
  // Calculate left over points
  amountOfPoints = this.maxPoints - this.usedPoints;

  // Keep track of current user
  user;
  // Keep track of the amount of proficiencies corresponding to chosen class
  profAmount;
  // Keep track of the amount of proficiencies choices corresponding to chosen class
  profChoices;
  // Keep track of the confirmed action
  confirmed: string;

  abilities = [
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

  // Character form validation schema
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
    abilityProficiencies: [[], Validators.required],
    proficiencies: [[], [Validators.required]],
  });
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private fireStorageService: FirebaseStorageService,
    private localStorageService: LocalstorageService,
    private firestoreService: FirestoreService,
    private alertController: AlertController,
    private navController: NavController
    ) { }

  ngOnInit() {
    // Get user from local storage
    const user = this.localStorageService.getStorageItem('user');
    // Set character form userid value
    this.characterForm.get('userId').setValue(user.uid);

    // Listen to valuechanges of the race input field
    this.characterForm.get('race').valueChanges.pipe(
      // Get the specific race from the api
      switchMap((value) => this.apiService.getCharacterRace(value)),
      ).subscribe((raceData: any) => {
        // Set character form speed valu
        this.characterForm.get('speed').setValue(raceData.speed, { emitEvent: false });
        // Keep track of the specific race's ability bonuses
        const bonuses = raceData.ability_bonuses;

        // Get character form ability bonuses value
        const abilityBonuses = this.characterForm.get('abilityBonuses');
        // Reset the bonuses on value changes to keep the bonuses corresponding to the chosen race
        abilityBonuses.setValue([]);

        // Check for existing bonuses
        if(bonuses) {
          // Loop over bonuses and set character fomr ability bonuses value
          bonuses.forEach((bonus) => {
            const abilityBonus = {
              index: bonus.ability_score.index,
              bonus: bonus.bonus
            };

          abilityBonuses.setValue([abilityBonus, ...abilityBonuses.value]);
          });
        }
    });

    // Listen to value changes of the class ipnut field
    this.characterForm.get('class').valueChanges.pipe(
      // Get the specific class from the api
      switchMap((value) => this.apiService.getCharacterClass(value)),
    ).subscribe((classData: any) => {
      // Reset the character form proficiencies value to keep the proficiencies corresponding to the specific class
      this.characterForm.get('proficiencies').setValue([]);
      // Set the character form totalHp value to the maximum hit die of the specific class
      this.characterForm.get('totalHp').setValue(classData.hit_die, { emitEvent: false });

      // Set the amount of proficiences the user can pick corresponding to the class
      this.profAmount = classData.proficiency_choices[0].choose;
      // Set the proficiencies the user can pick corresponding to the class
      this.profChoices = classData.proficiency_choices[0].from.options;

      // Get the character form ability proficiencies
      const abilityProficiencies = this.characterForm.get('abilityProficiencies');
      // Reset the ability proficiencies to keep them corresponding to the class
      abilityProficiencies.setValue([]);

      // Loop over the saving throws of the specific class and set the character form ability bonuses
      classData.saving_throws.forEach(ability => {
        abilityProficiencies.setValue([...abilityProficiencies.value, ability.index]);
      });
    });

    // Retrieve the keys from the character form to loop over them and use them to watch for value changes
    const abilities = Object.keys(this.characterForm.value.abilities);
    abilities.forEach(ability => {
        this.handleAttr(ability);
    });
  }

  // Check if the amout of choices is met or exceeded
  checkChoicesAmount(item: string) {
    // Get the character form proficiencies value
    const formControlValue = this.characterForm.get('proficiencies').value;
    // Check if the proficiencies array length is greater or equal to the current proficiencies amount and if the item isn't already chosen
    // Return a boolean to disable the option
    if(formControlValue.length >= this.profAmount && !formControlValue.includes(item)) {
      return true;
    }
    return false;
  }

  // Handle value changes on the ability input with corresponding point buy
  handleAttr(control: string): void {
    this.characterForm.get(['abilities', control]).valueChanges.pipe(
      // Initial value
      startWith(8),
      // Get the previous and current value
      pairwise(),
      tap(([current, previous]) => {
        // Check if previous value is 8 and store it
        const previousValue = previous || 8;
        // Check if current value is smaller than previous value
        if(current < previousValue) {
          if(current < 13 ) {
            // If the current value is smaller than 13 deduct 1 point from the points pool
            this.amountOfPoints--;
          } else {
            // If the current value is greater than 13 deduct 2 point from the points pool
            this.amountOfPoints-=2;
          }
        } else {
          if(current <= 13) {
            // If the current value is greater than or equal to 13 deduct 2 point from the points pool
            this.amountOfPoints++;
          } else {
          // If the current value is smaller or not equal to 13 deduct 2 point from the points pool
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

  // Check if character currently has a bonus on specific ability
  checkForBonus(ability: string): null | number {
    const check = this.characterForm.get('abilityBonuses').value.find((bonus) => bonus.index === ability );
    if(check) {
      return check.bonus;
    }

    return null;
  }

  // Calculate ability total
  calcAbilityTotal(abilityIndex): number {
    // Check for bonus
    const bonus = this.checkForBonus(abilityIndex);
    // Get the ability score
    const score = this.characterForm.get(['abilities', abilityIndex]).value;
    // Return score with or without bonus
    if(bonus) {
      return score + bonus;
    }
    return score;
  }

  // Add bonuses to ability scores
  addBonusesToAbilityScores(): void {
    // Get the ability score bonuses
    const bonuses = this.characterForm.get('abilityBonuses').value;

    // Loop over bonuses and set character form value
    bonuses.forEach((bonus) => {
      const ability = this.characterForm.get(['abilities', bonus.index]);
      ability.setValue(ability.value + bonus.bonus, { emitEvent: false });
    });
  }

  // Handle the imagepicker on click event
  onImagePick(imageData: string) {
    // Upload the image to the firebase storage
    this.fireStorageService.uploadData('images', imageData);
  }

  // Navigate back to the characters screen
  navigateBack() {
   this.navController.navigateForward('characters');
  }

  // Create a confirm alert to confirm the character creation and set the confirmation
  async confirmAlert() {
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

  // Handle the characterform submission
  async onSubmit() {
    // Create the confirm alert
    await this.confirmAlert();

    // Check if confirmed
    if(this.confirmed === 'confirm') {
      // Add the ability bonuses from the race to the ability scores
      this.addBonusesToAbilityScores();
      // Create new character document on the firestore
      this.firestoreService.createCharacter(this.characterForm.value);
      // Navigate to the characters screen
      this.navController.navigateForward('characters');
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { finalize, map, switchMap } from 'rxjs/operators';
import { CharacterClass, CharacterRace } from '../../interfaces';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'https://www.dnd5eapi.co';

  loadingProficiencies= new BehaviorSubject(false);
  constructor(private http: HttpClient) { }

  getCharacterRace(characterRace: CharacterRace) {
    return this.http.get(`${this.baseUrl}/api/races/${characterRace}`);
    }

  getCharacterClass(characterClass: CharacterClass ) {
    return this.http.get(`${this.baseUrl}/api/classes/${characterClass}`);
  };

  getCharacterSkills() {
    return this.http.get(`${this.baseUrl}/api/skills`).pipe(
      switchMap(({ results }: { results: any[] }) => combineLatest(results.map(({ url }) => this.http.get(`${this.baseUrl}${url}`))))
    );
  }

  getCharacterClassProficiencies(characterClass: CharacterClass) {
    this.loadingProficiencies.next(true);

    return this.http.get(`${this.baseUrl}/api/classes/${characterClass}/proficiencies`).pipe(
      switchMap(({ results }: { results: any[] }) => combineLatest(results.map(({ url }) => this.http.get(`${this.baseUrl}${url}`)))),
      finalize(() => {this.loadingProficiencies.next(false);})
    );
  }

  getCharacterStartingEquipment() {
    const characterClass: unknown = 'fighter';
    this.getCharacterClass(characterClass as CharacterClass).pipe(
      map(( result: any ) => {
        console.log(result.starting_equipment_options);
      })
    ).subscribe();

    // this.getCharacterClass(characterClass as CharacterClass).pipe(
    //   map( result = > {})
    // ).subscribe();
  }

  getCharacterSpells(characterClass: CharacterClass, level: number) {
    return this.http.get(`${this.baseUrl}/api/classes/${characterClass}/levels/${level}/spells`);
  }

  getCharacterSpell(spellIndex: string) {
    return this.http.get(`${this.baseUrl}/api/spells/${spellIndex}`);
  }
}

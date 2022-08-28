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

  loadingAbilities= new BehaviorSubject(false);
  loadingSkills= new BehaviorSubject(false);
  loadingProficiencies= new BehaviorSubject(false);
  constructor(private http: HttpClient) { }

  getCharacterRace(characterRace: CharacterRace) {
    return this.http.get(`${this.baseUrl}/api/races/${characterRace}`);
    }

  getCharacterClass(characterClass: CharacterClass ) {
    return this.http.get(`${this.baseUrl}/api/classes/${characterClass}`);
  };

  getCharacterSkills() {
    this.loadingSkills.next(true);

    return this.http.get(`${this.baseUrl}/api/skills`).pipe(
      switchMap(({ results }: { results: any[] }) => combineLatest(results.map(({ url }) => this.http.get(`${this.baseUrl}${url}`)))),
      finalize(() => { this.loadingSkills.next(false); })
    );
  }

  getCharacterClassProficiencies(characterClass: CharacterClass) {
    this.loadingProficiencies.next(true);

    return this.http.get(`${this.baseUrl}/api/classes/${characterClass}/proficiencies`).pipe(
      switchMap(({ results }: { results: any[] }) => combineLatest(results.map(({ url }) => this.http.get(`${this.baseUrl}${url}`)))),
      finalize(() => { this.loadingProficiencies.next(false); })
    );
  }

  getCharacterAbilities() {
    this.loadingAbilities.next(true);

    return this.http.get(`${this.baseUrl}/api/ability-scores`).pipe(
      switchMap(({results}: {results: any[]}) => combineLatest(results.map(({ url }) => this.http.get(`${this.baseUrl}${url}`)))),
      finalize(() => { this.loadingAbilities.next(false); })
    );
  }

  getCharacterSpells(characterClass: CharacterClass, level: number) {
    return this.http.get(`${this.baseUrl}/api/classes/${characterClass}/levels/${level}/spells`);
  }

  getCharacterSpell(spellIndex: string) {
    return this.http.get(`${this.baseUrl}/api/spells/${spellIndex}`);
  }
}

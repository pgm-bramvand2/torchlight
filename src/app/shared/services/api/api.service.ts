import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CharacterClass, CharacterRace } from '../../interfaces';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'https://www.dnd5eapi.co';

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
}

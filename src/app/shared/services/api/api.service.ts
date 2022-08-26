import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CharacterClass, CharacterRace } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

getCharacterRace(characterRace: CharacterRace) {
  return this.http.get(`https://www.dnd5eapi.co/api/races/${characterRace}`);
  }

  getCharacterClass(characterClass: CharacterClass ) {
    return this.http.get(`https://www.dnd5eapi.co/api/classes/${characterClass}`);
  };
}

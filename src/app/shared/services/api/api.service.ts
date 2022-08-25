import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Race } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

getRace(race: Race) {
  return this.http.get(`https://www.dnd5eapi.co/api/races/${race}`);
  }
}

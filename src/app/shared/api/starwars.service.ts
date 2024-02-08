import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StarWarsService {
  private BASE_URL = 'https://swapi.dev/api';
  private http = inject(HttpClient);

  constructor() {}

  getStarships() {
    return this.http.get(`${this.BASE_URL}/starships/`);
  }

  getPilots() {
    return this.http.get(`${this.BASE_URL}/people/`); // Asumiendo que 'people' es el endpoint para pilotos
  }

  getFilms() {
    return this.http.get(`${this.BASE_URL}/films/`);
  }
}

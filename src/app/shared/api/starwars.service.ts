// starwars.service
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

  // Asumiendo que 'people' es el endpoint para pilotos
  getPilots() {
    return this.http.get(`${this.BASE_URL}/people/`);
  }

  // Obtener los planetas de los pilotos que provienen de otra url => https://swapi.dev/api/planets/1/
  getPlanetByUrl(url: string) {
    return this.http.get(url);
  }

  getFilms() {
    return this.http.get(`${this.BASE_URL}/films/`);
  }
}

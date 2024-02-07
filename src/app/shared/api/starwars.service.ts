import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StarWarsService {
  private apiUrl = 'https://swapi.dev/api';

  constructor(private http: HttpClient) {}

  getStarships(): Observable<any> {
    return this.http.get(`${this.apiUrl}/starships/`);
  }

  getPilots(): Observable<any> {
    return this.http.get(`${this.apiUrl}/people/`); // Asumiendo que 'people' es el endpoint para pilotos
  }

  getFilms(): Observable<any> {
    return this.http.get(`${this.apiUrl}/films/`);
  }
}

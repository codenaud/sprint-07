// pilots.ts
import { Component, OnInit, inject } from '@angular/core';
import { StarWarsService } from '../../shared/api/starwars.service';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-pilots',
  standalone: true,
  imports: [],
  templateUrl: './pilots.component.html',
  styleUrls: ['./pilots.component.scss'],
})
export class PilotsComponent implements OnInit {
  private starwarsService = inject(StarWarsService);
  pilots: any = [];

  ngOnInit(): void {
    this.loadPilots();
  }

  loadPilots() {
    this.starwarsService.getPilots().subscribe((response: any) => {
      const pilotsWithPlanets = response.results.map((pilot: any) => {
        return this.starwarsService.getPlanetByUrl(pilot.homeworld).pipe(
          map((planet: any) => ({
            ...pilot,
            homeworldName: planet.name, // Agregamos el nombre del planeta
            id: this.extractId(pilot.url),
          })),
          catchError((error) => {
            console.error('Error fetching planet details:', error);
            return of({
              ...pilot,
              homeworldName: 'Unknown',
              id: this.extractId(pilot.url),
            });
          })
        );
      });
      forkJoin(pilotsWithPlanets).subscribe((completedPilots) => {
        this.pilots = completedPilots;
      });
    });
  }

  extractId(url: string): string {
    const idPattern = /\/([0-9]*)\/$/;
    const match = url.match(idPattern);
    return match ? match[1] : '';
  }
}
/**
     *  ! Solución ERROR => NullInjectorError:
     *  * recuerda añadir  --> provideHttpClient() en app.config.ts
     *  export const appConfig: ApplicationConfig = {
        providers: [provideRouter(routes), provideHttpClient()],
        };
    */

/*
        Ejemplo de people
        -------------------
        {
            "name": "Luke Skywalker",
            "height": "172",
            "mass": "77",
            "hair_color": "blond",
            "skin_color": "fair",
            "eye_color": "blue",
            "birth_year": "19BBY",
            "gender": "male",
            "homeworld": "https://swapi.dev/api/planets/1/",
            "films": [
                "https://swapi.dev/api/films/1/",
                "https://swapi.dev/api/films/2/",
                "https://swapi.dev/api/films/3/",
                "https://swapi.dev/api/films/6/"
            ],
            "species": [],
            "vehicles": [
                "https://swapi.dev/api/vehicles/14/",
                "https://swapi.dev/api/vehicles/30/"
            ],
            "starships": [
                "https://swapi.dev/api/starships/12/",
                "https://swapi.dev/api/starships/22/"
            ],
            "created": "2014-12-09T13:50:51.644000Z",
            "edited": "2014-12-20T21:17:56.891000Z",
            "url": "https://swapi.dev/api/people/1/"
        },
        -------------------
   */

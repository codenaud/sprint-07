// pilots.ts
import { Component, OnInit, inject } from '@angular/core';
import { StarWarsService } from '../../shared/api/starwars.service';
import { forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

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
    this.starwarsService
      .getPilots()
      .pipe(
        switchMap((response: any) => {
          const pilotsObservables = response.results.map((pilot: any) =>
            this.starwarsService.getPlanetByUrl(pilot.homeworld).pipe(
              map((planet: any) => ({
                ...pilot,
                homeworldName: planet.name,
                id: this.extractId(pilot.url),
                imageUrl: this.starwarsService.getCharacterImageUrl(
                  this.extractId(pilot.url)
                ),
              })),
              catchError(() =>
                of({
                  ...pilot,
                  homeworldName: 'Unknown',
                  id: this.extractId(pilot.url),
                  imageUrl: this.starwarsService.getCharacterImageUrl(
                    this.extractId(pilot.url)
                  ),
                })
              )
            )
          );
          return forkJoin(pilotsObservables);
        })
      )
      .subscribe((completedPilots) => {
        this.pilots = completedPilots;
      });
  }

  onImageError(event: any) {
    event.target.src =
      'https://starwars-visualguide.com/assets/img/big-placeholder.jpg';
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

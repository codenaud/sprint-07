import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-starships',
  standalone: true,
  imports: [],
  templateUrl: './starships.component.html',
  styleUrl: './starships.component.scss',
})
export class StarshipsComponent implements OnInit {
  http = inject(HttpClient);
  starships: any = [];

  ngOnInit(): void {
    this.fetchStarships();
  }

  fetchStarships() {
    this.http
      .get('https://swapi.dev/api/starships/')
      .subscribe((response: any) => {
        console.log(response.results); // Ahora deberías ver solo las naves estelares en la consola
        this.starships = response.results.map((starship: any) => {
          return {
            ...starship,
            id: this.extractId(starship.url), // Añadimos el ID extraído de la URL
          };
        });
      });
  }

  extractId(url: string): string {
    const idPattern = /\/([0-9]*)\/$/; // Regex para extraer el ID
    const match = url.match(idPattern);
    return match ? match[1] : ''; // Devuelve el ID o una cadena vacía si no hay coincidencia
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
      Ejemplo de post
      -------------------
      {
            "name": "CR90 corvette",
            "model": "CR90 corvette",
            "manufacturer": "Corellian Engineering Corporation",
            "cost_in_credits": "3500000",
            "length": "150",
            "max_atmosphering_speed": "950",
            "crew": "30-165",
            "passengers": "600",
            "cargo_capacity": "3000000",
            "consumables": "1 year",
            "hyperdrive_rating": "2.0",
            "MGLT": "60",
            "starship_class": "corvette",
            "pilots": [],
            "films": [
                "https://swapi.dev/api/films/1/",
                "https://swapi.dev/api/films/3/",
                "https://swapi.dev/api/films/6/"
            ],
            "created": "2014-12-10T14:20:33.369000Z",
            "edited": "2014-12-20T21:23:49.867000Z",
            "url": "https://swapi.dev/api/starships/2/"
        },
      -------------------
 */

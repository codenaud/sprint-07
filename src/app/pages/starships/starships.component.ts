//starships.component
import { Component, inject, OnInit } from '@angular/core';
import { StarWarsService } from '../../shared/api/starwars.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-starships',
  standalone: true,
  imports: [RouterModule, CommonModule, InfiniteScrollModule],
  templateUrl: './starships.component.html',
  styleUrl: './starships.component.scss',
})
export class StarshipsComponent implements OnInit {
  starships: any = [];
  currentPage = 1;
  totalPages = 0;

  onScrollDown(): void {
    this.currentPage++;
    this.loadStarships(this.currentPage);
  }
  constructor(private starwarsService: StarWarsService) {}

  ngOnInit(): void {
    this.loadStarships(this.currentPage);
  }

  loadStarships(page: number) {
    this.starwarsService.getStarships(page).subscribe((response: any) => {
      // this.totalPages = Math.ceil(response.count / 10);  Asumiendo 10 resultados por página
      this.starships = [
        ...this.starships,
        ...response.results.map((starship: any) => {
          const id = this.extractId(starship.url); // Extraes el ID
          const imageUrl = this.starwarsService.getStarshipsImageUrl(id); // Construyes la URL de la imagen
          return {
            ...starship,
            id: id,
            imageUrl: imageUrl, // Añades la URL de la imagen al objeto de la nave estelar
          };
        }),
      ];
      this.currentPage = page;
    });
  }

  goToPage(page: number) {
    this.loadStarships(page);
  }

  // Si no hay imagen se mostrará esta imagen
  onImageError(event: any) {
    event.target.src =
      'https://starwars-visualguide.com/assets/img/big-placeholder.jpg';
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
      Ejemplo de starship
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

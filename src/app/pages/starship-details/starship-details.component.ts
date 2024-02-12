import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StarWarsService } from '../../shared/api/starwars.service';
import { CommonModule } from '@angular/common';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-starship-details',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './starship-details.component.html',
  styleUrls: ['./starship-details.component.scss'],
})
export class StarshipDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private starwarsService = inject(StarWarsService);
  starship: any;

  pilots: any[] = [];
  pilotsAvailable: boolean = true; // Inicialmente asume que hay pilotos disponibles

  films: any[] = [];
  filmsAvailable: boolean = true; // Asume inicialmente que hay films disponibles

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.starwarsService.getStarshipById(id).subscribe((starship: any) => {
        const imageUrl = this.starwarsService.getStarshipsImageUrl(id);
        this.starship = { ...starship, imageUrl: imageUrl };

        if (starship.pilots.length > 0) {
          const pilotsRequests: Observable<any>[] = starship.pilots.map(
            (pilotUrl: string) => {
              const pilotId = this.extractId(pilotUrl);
              return this.starwarsService.getPilotById(pilotId);
            }
          );

          forkJoin(pilotsRequests).subscribe({
            next: (pilotsDetails) => {
              this.pilots = pilotsDetails.map((pilot) => {
                return {
                  ...pilot,
                  imageUrl: this.starwarsService.getCharacterImageUrl(
                    this.extractId(pilot.url)
                  ),
                };
              });
            },
            error: (error) => {
              console.error('Error loading pilots', error);
              // Maneja el error adecuadamente
            },
          });
        } else {
          // No hay pilotos para esta nave estelar
          this.pilotsAvailable = false;
        }
        if (starship.films.length > 0) {
          const filmRequests: Observable<any>[] = starship.films.map(
            (filmUrl: string) => {
              const filmId = this.extractId(filmUrl);
              return this.starwarsService.getFilmById(filmId);
            }
          );

          forkJoin(filmRequests).subscribe({
            next: (filmsDetails) => {
              this.films = filmsDetails.map((film) => {
                return {
                  ...film,
                  imageUrl: this.starwarsService.getFilmsImageUrl(
                    this.extractId(film.url)
                  ),
                };
              });
            },
            error: (error) => console.error('Error loading films', error),
          });
        } else {
          // No hay films para esta nave estelar
          this.filmsAvailable = false;
        }
      });
    }
  }

  onImageError(event: any) {
    event.target.src =
      'https://starwars-visualguide.com/assets/img/big-placeholder.jpg';
    event.target.style.maxWidth = '550px';
    event.target.style.maxHeight = '367px';
  }

  extractId(url: string): string {
    const idPattern = /\/([0-9]*)\/$/;
    const match = url.match(idPattern);
    return match ? match[1] : '';
  }
}

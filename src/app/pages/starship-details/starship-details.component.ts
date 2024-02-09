//starsgip-details.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StarWarsService } from '../../shared/api/starwars.service';

@Component({
  selector: 'app-starship-details',
  standalone: true,
  imports: [RouterModule], // Asegúrate de importar RouterModule aquí si es un componente independiente
  templateUrl: './starship-details.component.html',
  styleUrls: ['./starship-details.component.scss'],
})
export class StarshipDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private starwarsService = inject(StarWarsService);
  starships: any;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.starwarsService.getStarshipById(id).subscribe((starship) => {
        this.starships = starship;
      });
    }
    this.loadStarships();
  }

  loadStarships() {
    this.starwarsService.getStarships().subscribe((response: any) => {
      this.starships = response.results.map((starship: any) => {
        const id = this.extractId(starship.url); // Extraes el ID
        const imageUrl = this.starwarsService.getStarshipsImageUrl(id); // Extraer la imágen
        return {
          ...starship,
          id: id,
          imageUrl: imageUrl, // Añades la URL de la imagen al objeto de la nave estelar
        };
      });
      console.log(this.starships); // Ahora deberías ver las naves estelares con URLs de imágenes en la consola
    });
  }

  // Si no hay imagen se mostrará esta imagen
  onImageError(event: any) {
    event.target.src =
      'https://starwars-visualguide.com/assets/img/big-placeholder.jpg';
    // Aplica estilos directamente para controlar el tamaño máximo
    event.target.style.maxWidth = '550px';
    event.target.style.maxHeight = '367px';
  }

  extractId(url: string): string {
    const idPattern = /\/([0-9]*)\/$/; // Regex para extraer el ID
    const match = url.match(idPattern);
    return match ? match[1] : ''; // Devuelve el ID o una cadena vacía si no hay coincidencia
  }
}

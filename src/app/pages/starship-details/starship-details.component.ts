// starship-details.component.ts
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
  starship: any;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.starwarsService.getStarshipById(id).subscribe((starship) => {
        // Asegúrate de que aquí procesas correctamente la respuesta para extraer la información de la nave estelar
        // y asignar la URL de la imagen adecuadamente
        const imageUrl = this.starwarsService.getStarshipsImageUrl(id);
        this.starship = { ...starship, imageUrl: imageUrl };
      });
    }
  }

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

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
        this.starship = starship;
      });
    }
  }
}

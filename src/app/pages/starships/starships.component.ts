import { Component, OnInit } from '@angular/core';
import { StarWarsService } from '../../shared/api/starwars.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-starships',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './starships.component.html',
  styleUrl: './starships.component.scss',
})
export class StarshipsComponent {}

/* export class StarshipsComponent implements OnInit {
  starships: any = [];

  constructor(private starWarsService: StarWarsService) {}

  ngOnInit(): void {
    this.starWarsService.getStarships().subscribe((data) => {
      this.starships = data.results;
    });
  }
} */

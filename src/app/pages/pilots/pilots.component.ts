import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-pilots',
  standalone: true,
  imports: [],
  templateUrl: './pilots.component.html',
  styleUrl: './pilots.component.scss',
})
export class PilotsComponent implements OnInit {
  http = inject(HttpClient);
  pilots: any = [];

  ngOnInit(): void {}

  fetchPilots() {
    this.http
      .get('https://jsonplaceholder.typicode.com/people')
      .subscribe((pilots: any) => {
        console.log(pilots); // se muestra en la 'consola'
        this.pilots = pilots; // se muestra en 'pantalla' => {{ post.name}} en HTML
      });
  }
}

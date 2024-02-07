import { Routes } from '@angular/router';
import { StarshipsComponent } from './pages/starships/starships.component';
import { FilmsComponent } from './pages/films/films.component';
import { PilotsComponent } from './pages/pilots/pilots.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'starships', component: StarshipsComponent },
  { path: 'films', component: FilmsComponent },
  { path: 'pilots', component: PilotsComponent },
  // Considera añadir una ruta para manejar rutas no encontradas
  // { path: '**', component: PageNotFoundComponent },
];

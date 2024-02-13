//app.routes.ts
import { Routes } from '@angular/router';
import { StarshipsComponent } from './pages/starships/starships.component';
import { FilmsComponent } from './pages/films/films.component';
import { PilotsComponent } from './pages/pilots/pilots.component';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './pages/post/post.component';
import { StarshipDetailsComponent } from './pages/starship-details/starship-details.component';
import { LoginComponent } from './shared/components/forms/login/login.component';
import { SingupComponent } from './shared/components/forms/singup/singup.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  // redirección de satrship a login para poder ver las 'starships'
  { redirectTo: 'login', path: 'starships', pathMatch: 'full' },
  { path: 'starships', component: StarshipsComponent },
  { path: 'starships/:id', component: StarshipDetailsComponent },
  { path: 'films', component: FilmsComponent },
  { path: 'pilots', component: PilotsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'singup', component: SingupComponent },
  // { path: 'posts', component: PostComponent },
  // Considera añadir una ruta para manejar rutas no encontradas
  // { path: '**', component: PageNotFoundComponent },
];

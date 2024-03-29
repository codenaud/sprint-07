//app.routes.ts
import { Routes } from '@angular/router';
import { StarshipsComponent } from './pages/starships/starships.component';
import { FilmsComponent } from './pages/films/films.component';
import { PilotsComponent } from './pages/pilots/pilots.component';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './pages/post/post.component';
import { StarshipDetailsComponent } from './pages/starship-details/starship-details.component';
import { LoginComponent } from './shared/components/forms/login/login.component';
import { SignupComponent } from './shared/components/forms/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'starships',
    component: StarshipsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'starships/:id', component: StarshipDetailsComponent },
  { path: 'films', component: FilmsComponent },
  { path: 'pilots', component: PilotsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // { path: 'posts', component: PostComponent },
  // Considera añadir una ruta para manejar rutas no encontradas
  // { path: '**', component: PageNotFoundComponent },
];

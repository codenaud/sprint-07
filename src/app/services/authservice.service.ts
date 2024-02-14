import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router) {
    const authToken = localStorage.getItem('authToken');
    this.loggedIn.next(!!authToken); // Convierte la existencia del token en un valor booleano
  }

  // En AuthService
  setUserAuthenticated() {
    this.loggedIn.next(true);
    localStorage.setItem('authToken', 'tu_token_simulado_aquí'); // o cualquier token real
  }

  login() {
    // Simula el inicio de sesión y actualiza el estado
    localStorage.setItem('authToken', 'tu_token_simulado_aquí');
    this.loggedIn.next(true); // Asegúrate de que esto se llama después de establecer el token
  }

  logout() {
    // Limpia el estado de autenticación al cerrar sesión
    this.loggedIn.next(false);
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']); // Añadir esta línea para redirigir al usuario
  }
}

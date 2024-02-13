import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor() {}

  login() {
    // Simula el inicio de sesión y actualiza el estado
    this.loggedIn.next(true);
    localStorage.setItem('authToken', 'tu_token_simulado_aquí');
  }

  logout() {
    // Limpia el estado de autenticación al cerrar sesión
    this.loggedIn.next(false);
    localStorage.removeItem('authToken');
    // Redirige al usuario a la página de inicio de sesión o a donde desees
  }
}

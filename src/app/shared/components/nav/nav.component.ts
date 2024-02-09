import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  constructor() {}

  closeNavbar(): void {
    // Comprueba si el menú de navegación está abierto y lo cierra
    if (window.innerWidth < 992) {
      // Asume que el breakpoint de Bootstrap es 992px para el navbar-toggler
      const toggleButton = document.querySelector(
        '.navbar-toggler'
      ) as HTMLElement;
      const navbarCollapse = document.querySelector(
        '.navbar-collapse'
      ) as HTMLElement;
      if (toggleButton.getAttribute('aria-expanded') === 'true') {
        toggleButton.click(); // Simula un clic en el botón para cerrar el menú
      }
    }
  }
}

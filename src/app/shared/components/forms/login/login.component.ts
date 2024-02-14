import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { CustomValidators } from '../../../custom-validators';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../services/authservice.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private http: HttpClient, // Asume que ya lo tienes inyectado para hacer las llamadas HTTP
    private authService: AuthService, // Servicio de autenticación
    private router: Router, // Para manejar la redirección
    private route: ActivatedRoute, // Para acceder a los queryParams
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      /* fName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          CustomValidators.onlyLetters, // Asumiendo que tienes este validador personalizado
        ],
      ], */
      fEmail: ['', [Validators.required, Validators.email]],
      fPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          CustomValidators.atLeastOneUppercase,
          CustomValidators.atLeastOneLowercase,
          CustomValidators.atLeastOneNumber,
        ],
      ],
    });
  }

  /* verificación [class.is-invalid] de bootstrap. Una variable booleana utilizada para rastrear si el formulario ha sido enviado. Esto ayuda a controlar la visualización de los mensajes de validación */
  submitted = false;

  // En tu componente de login
  loginData() {
    this.http.get<any>('http://localhost:3000/signupUsersList').subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return (
            a.email === this.loginForm.value.email &&
            a.password === this.loginForm.value.password
          );
        });
        if (user) {
          this.authService.setUserAuthenticated(); // Asume authService inyectado en tu componente
          alert('Login Successful');
          this.loginForm.reset();

          // Cambio clave aquí: Utilizar returnUrl para la redirección
          const returnUrl =
            this.route.snapshot.queryParams['returnUrl'] || '/starships'; // Usamos '/starships' como fallback
          this.router
            .navigateByUrl(returnUrl)
            .then((success) => {
              if (success) {
                console.log(`Navegación a '${returnUrl}' exitosa`);
              } else {
                console.log(`Navegación a '${returnUrl}' fallida`);
              }
            })
            .catch((error) => {
              console.error('Error durante la navegación:', error);
            });
        } else {
          alert('user not found');
        }
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }

  // limpiar formulario de registro
  registerFormClean() {
    this.loginForm.reset();
  }
}

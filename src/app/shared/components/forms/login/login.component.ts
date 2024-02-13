import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CustomValidators } from '../../../custom-validators';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

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
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
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
          // Guardar un token o un indicador en localStorage
          localStorage.setItem('isLoggedIn', 'true');
          // O cualquier otro dato relevante, como un token de autenticación real

          alert('Login Succesful');
          this.loginForm.reset();
          this.router.navigate(['starships']);
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

// signup.component.ts
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
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  // verificación contraseña
  hidePasswordConfirmation: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group(
      {
        fName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            CustomValidators.onlyLetters,
          ],
        ],
        fLastName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            CustomValidators.onlyLetters,
          ],
        ],
        fEmail: ['', [Validators.required, Validators.email]],
        fPhone: ['', [Validators.required, CustomValidators.onlyPhones]],
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
        fPasswordConfirmation: ['', [Validators.required]],
      },
      {
        validators: CustomValidators.mustBeEqual(
          'fPassword',
          'fPasswordConfirmation'
        ),
      }
    );
  }

  /* verificación [class.is-invalid] de bootstrap. Una variable booleana utilizada para rastrear si el formulario ha sido enviado. Esto ayuda a controlar la visualización de los mensajes de validación */
  submitted = false;

  signupData() {
    if (this.signupForm.valid) {
      this.http
        .post<any>(
          'http://localhost:3000/signupUsersList',
          this.signupForm.value
        )
        .subscribe({
          next: (res) => {
            alert('SIGNUP SUCCESSFUL');
            this.signupForm.reset();
            this.router.navigate(['login']);
          },
          error: (err) => {
            alert('Something went wrong');
          },
        });
    }
  }

  // limpiar formulario de registro
  registerFormClean() {
    this.signupForm.reset();
  }
}

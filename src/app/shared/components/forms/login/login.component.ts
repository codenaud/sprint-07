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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterOutlet, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      fName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          CustomValidators.onlyLetters, // Asumiendo que tienes este validador personalizado
        ],
      ],
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

  logindata() {
    this.submitted = true;
    if (this.loginForm.valid) {
      console.log(this.loginForm.value); // Ver en consola 'name' & 'password'
      // Lógica de autenticación
    }
  }
  // limpiar formulario de registro
  registerFormclean() {
    this.loginForm.reset();
  }
}

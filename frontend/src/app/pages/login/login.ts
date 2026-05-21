import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  login() {

    if (!this.email || !this.password) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Campos requeridos',
        detail: 'Completa email y contraseña'
      });
      return;
    }

    this.authService.login(this.email, this.password)
      .subscribe({
        next: (response) => {
          this.authService.saveToken(response);

          this.messageService.add({
            severity: 'success',
            summary: 'Login correcto',
            detail: 'Bienvenido'
          });

          setTimeout(() => {
            this.router.navigate(['/admin/dashboard']);
          }, 800);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error de autenticación',
            detail: 'Email o contraseña incorrectos'
          });
        }
      });
  }
}
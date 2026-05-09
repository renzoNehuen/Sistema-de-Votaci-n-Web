import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { LoginDto, LoginResponseDto } from '../../dtos/auth.dto';

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
    private http: HttpClient,
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

    const payload: LoginDto = {
      email: this.email,
      password: this.password
    };

    this.http.post<LoginResponseDto>('http://localhost:8000/api/login', payload)
      .subscribe({
        next: (response) => {
          if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
            window.localStorage.setItem('token', response.token);
            window.localStorage.setItem('admin', JSON.stringify(response.admin));
          }

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
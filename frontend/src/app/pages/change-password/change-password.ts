import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

import { Header } from '../../shared/header/header';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PasswordModule,
    ButtonModule,
    Header
  ],
  templateUrl: './change-password.html',
  styleUrls: ['./change-password.scss']
})
export class ChangePassword {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';
  messageType: 'success' | 'error' = 'error';

  save() {
    this.message = '';

    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      this.messageType = 'error';
      this.message = 'Completa todos los campos antes de guardar.';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.messageType = 'error';
      this.message = 'Las nuevas contraseñas no coinciden.';
      return;
    }

    const payload = {
      current_password: this.currentPassword,
      new_password: this.newPassword,
      new_password_confirmation: this.confirmPassword
    };

    this.authService.changePassword(payload).subscribe({
      next: () => {
        this.messageType = 'success';
        this.message = 'Contraseña actualizada correctamente. Por seguridad, inicia sesión de nuevo.';
        setTimeout(() => this.authService.logout(), 1200);
      },
      error: (error) => {
        this.messageType = 'error';
        this.message = error?.error?.message || 'Error al actualizar la contraseña';
      }
    });
  }
}

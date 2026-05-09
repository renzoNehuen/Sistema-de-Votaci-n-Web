import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

import { Header } from '../../shared/header/header';

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

  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  save() {
    if (this.newPassword !== this.confirmPassword) {
      console.error('Las contraseñas no coinciden');
      return;
    }

    const payload = {
      current_password: this.currentPassword,
      new_password: this.newPassword,
      new_password_confirmation: this.confirmPassword
    };

    console.log('Enviar al backend:', payload);

    // TODO: conectar con API
  }
}

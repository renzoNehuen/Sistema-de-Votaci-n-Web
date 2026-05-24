import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { AdminDto } from '../../dtos/auth.dto';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {
  isAuthenticated$: Observable<boolean>;
  admin$: Observable<AdminDto | null>;

  constructor(private authService: AuthService) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.admin$ = this.authService.admin$;
    // Inicializar verificación de sesión
    this.authService.initialize();
  }

  logout(): void {
    this.authService.logout();
  }
}
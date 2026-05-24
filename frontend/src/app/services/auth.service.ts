import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginDto, LoginResponseDto, AdminDto } from '../dtos/auth.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private adminSubject = new BehaviorSubject<AdminDto | null>(this.getAdmin());
  public admin$ = this.adminSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // Inicializa el estado de autenticación al crear el servicio
  private initAuth(): void {
    if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
      return;
    }

    const token = window.localStorage.getItem('token');
    const admin = this.getAdmin();

    if (!token || !admin) {
      this.clearStorage();
      return;
    }

    const options = this.getAuthOptions();
    this.http.get<AdminDto>('http://localhost:8000/api/me', options).subscribe({
      next: (res: AdminDto) => {
        this.adminSubject.next(res);
        this.isAuthenticatedSubject.next(true);
        window.localStorage.setItem('admin', JSON.stringify(res));
      },
      error: () => {
        this.clearStorage();
      }
    });
  }

  private clearStorage(): void {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('admin');
    }
    this.isAuthenticatedSubject.next(false);
    this.adminSubject.next(null);
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      return window.localStorage.getItem('token');
    }
    return null;
  }

  public getAuthOptions(): { headers: { Authorization: string; Accept: string } } | {} {
    const token = this.getToken();
    if (token) {
      return {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      };
    }
    return {};
  }

  private jsonHeaders(): { headers: { 'Content-Type': string; Accept: string } } {
    return {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };
  }

  login(email: string, password: string): Observable<LoginResponseDto> {
    const payload: LoginDto = { email, password };
    return this.http.post<LoginResponseDto>('http://localhost:8000/api/login', payload, this.jsonHeaders());
  }

  saveToken(response: LoginResponseDto): void {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      window.localStorage.setItem('token', response.token);
      window.localStorage.setItem('admin', JSON.stringify(response.admin));
      this.adminSubject.next(response.admin);
      this.isAuthenticatedSubject.next(true);
    }
  }

  logout(): void {
    this.clearStorage();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      return !!window.localStorage.getItem('token');
    }
    return false;
  }

  getAdmin(): AdminDto | null {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      const admin = window.localStorage.getItem('admin');
      return admin ? JSON.parse(admin) : null;
    }
    return null;
  }

  // Llamar explícitamente desde fuera si es necesario
  public initialize(): void {
    this.initAuth();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginDto, LoginResponseDto, AdminDto } from '../dtos/auth.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<LoginResponseDto> {
    const payload: LoginDto = { email, password };
    return this.http.post<LoginResponseDto>('http://localhost:8000/api/login', payload);
  }

  saveToken(response: LoginResponseDto): void {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      window.localStorage.setItem('token', response.token);
      window.localStorage.setItem('admin', JSON.stringify(response.admin));
      this.isAuthenticatedSubject.next(true);
    }
  }

  logout(): void {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('admin');
      this.isAuthenticatedSubject.next(false);
    }
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
}

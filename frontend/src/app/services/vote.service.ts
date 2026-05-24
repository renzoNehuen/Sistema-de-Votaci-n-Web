import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private base = 'http://localhost:8000/api/votes';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.base, this.authService.getAuthOptions());
  }

  create(payload: any): Observable<any> {
    return this.http.post<any>(this.base, payload, this.authService.getAuthOptions());
  }

  createPublic(payload: any): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/public/votes', payload);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.base}/${id}`, this.authService.getAuthOptions());
  }
}

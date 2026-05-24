import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface VoterPayload {
  name: string;
  lastName?: string;
  document: string;
  dob?: string | null;
  isCandidate?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class VoterService {
  private base = 'http://localhost:8000/api/voters';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.base, this.authService.getAuthOptions());
  }

  getPublicCandidates(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8000/api/public/candidates');
  }

  findByDocument(document: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/public/voters/search`, {
      params: { document }
    });
  }

  create(payload: VoterPayload): Observable<any> {
    return this.http.post<any>(this.base, payload, this.authService.getAuthOptions());
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.base}/${id}`, this.authService.getAuthOptions());
  }

  update(id: number, payload: VoterPayload): Observable<any> {
    return this.http.put<any>(`${this.base}/${id}`, payload, this.authService.getAuthOptions());
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.base}/${id}`, this.authService.getAuthOptions());
  }
}

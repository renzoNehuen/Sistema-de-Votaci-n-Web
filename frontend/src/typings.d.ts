declare module '@angular/common/http' {
  import { Observable } from 'rxjs';

  export function provideHttpClient(...options: any[]): any;

  export class HttpClient {
    post<T>(url: string, body: any | null, options?: any): Observable<T>;
  }

  export class HttpClientModule {}
  export class HttpClientJsonpModule {}
  export class HttpClientXsrfModule {}

  export class HttpHeaders {}
  export class HttpParams {}
  export class HttpRequest<T> {}
  export class HttpResponse<T> {}
  export class HttpErrorResponse extends Error {}
  export type HttpEventType = number;
  export type HttpStatusCode = number;
  export type HttpContextToken<T> = any;
  export type HttpContext = any;
}

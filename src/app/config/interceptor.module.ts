import { Injectable, NgModule } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.dev';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

  private baseUrl = environment.apiUrl;
  private allowed: Array<string> = [`${this.baseUrl}/auth/signin`, `${this.baseUrl}/auth/signup`]

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let user = JSON.parse(sessionStorage.getItem('user'));

    if (!this.allowed.includes(request.url)) {
      if (user && user.token) {
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${user.token}` },
        });
      }
    }

    return next.handle(request)
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true,
    },
  ],
})
export class Interceptor { }

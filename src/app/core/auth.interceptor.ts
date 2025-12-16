import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('accessToken');
    const expiry = Number(localStorage.getItem('expiry'));
    const now = Date.now();

    if (token && expiry && now < expiry) {
      const updatedReq = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
      return next.handle(updatedReq);
    }

    if (token && expiry && now > expiry) {
      return new Observable(observer => {
        this.authService.refreshToken().subscribe({
          next: (res) => {
            this.authService.saveToken(res);

            const retryReq = req.clone({
              setHeaders: {
                Authorization: 'Bearer ' + res.accessToken
              }
            });

            next.handle(retryReq).subscribe(observer);
          },
          error: (err) => observer.error(err)
        });
      });
    }

    return next.handle(req);
  }
}
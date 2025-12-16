import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private username = 'admin';
  private password = 'admin123'
  constructor() { }

  login(username: string, password: string): Observable<any> {
    if (username === this.username && password === this.password)
      return of({
        accessToken: 'access-token-123',
        refreshToken: 'refresh-token-abc',
        expiresIn: 120
      }).pipe(delay(800));
    return throwError(() => new Error('Invalid Username or password'))
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    const expiry = Number(localStorage.getItem('expiry'));
    if (!token || !expiry) {
      return false;
    }
    return Date.now() < expiry;
  }

  storeAuthDetails(res: any) {
    const expiryTime = Date.now() + res.expiresIn * 1000;
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    localStorage.setItem('expiry', expiryTime.toString());
  }

  refreshToken(): Observable<any> {
    return of({
      accessToken: 'new-access-token-456',
      expiresIn: 120
    }).pipe(delay(500));
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  saveToken(res: any): void {
    const expiryTime = Date.now() + res.expiresIn * 1000;
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('expiry', expiryTime.toString());
  }

  isTokenExpired(): boolean {
    const expiry = Number(localStorage.getItem('expiry'));
    return !expiry || Date.now() > expiry;
  }
}


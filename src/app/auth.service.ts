import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  private apiUrl = environment.apiUrl+'/api/v1/auth';

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token'); 
    return token !== null;
  }
  
  login(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      password: password
    };
    return this.http.post(`${this.apiUrl}/login`, body)
  }

  
  register(email: string, password: string, passwordConfirmation: string): Observable<any> {
    const body = {
      email: email,
      password: password,
      password_confirmation: passwordConfirmation
    };
    return this.http.post(`${this.apiUrl}/register`, body)
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }
  logOut(): void {
    localStorage.removeItem('token');
  }


}

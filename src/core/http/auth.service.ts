import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterUser } from 'src/app/models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated() {
    throw new Error('Method not implemented.');
  }
  private baseUrl = environment.api;

  constructor(private http: HttpClient) {}

  login(loginUser: { email: string | null; password: string | null }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, loginUser);
  }

  register(registerUser: RegisterUser): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, registerUser);
  }
}
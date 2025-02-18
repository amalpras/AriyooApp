import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.api;

  constructor(private http: HttpClient) {}

  login(loginUser: { email: string | null; password: string | null }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, loginUser);
  }
}
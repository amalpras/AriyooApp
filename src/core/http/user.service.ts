import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User, UpdatePassword } from 'src/app/models/tag.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private baseUrl = environment.api;
    
    constructor(private http: HttpClient) {}
    
    updateUser(user: User) {
        return this.http.put<User>(`${this.baseUrl}/api/user`, user);
    }

    updatePassword(updatePasswordData: UpdatePassword) {
        return this.http.put<User>(`${this.baseUrl}/api/user/updatepassword`, updatePasswordData);
    }

    // forgotPassword(email: string): Observable<any> {
    //     return this.http.post(`${this.baseUrl}/api/user/forgotpassword`, { email });
    // }
}
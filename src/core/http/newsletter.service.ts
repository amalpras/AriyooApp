import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

    private baseUrl = environment.api;
    
    constructor(private http: HttpClient) {}
    
    addNewsletter(email: string) {
        return this.http.post(`${this.baseUrl}/api/Newsletter/${email}`, {  });
    }   
}
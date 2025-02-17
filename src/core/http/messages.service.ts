import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostMessageRequest, sendSessionMessage, Tag } from 'src/app/models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private baseUrl = 'http://localhost:5296';

  constructor(private http: HttpClient) {}

  sendMessage(data: PostMessageRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Message/postQuestion`, data);
  }

  getMessagesSeeker(seekerId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Message/getMessagesForSeeker/${seekerId}`);
  }

  getMessagesSolver(solverId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Message/getMessagesForSolver/${solverId}`);
  }

  getActiveSessionsSeeker(seekerId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Message/activesessionseeker/${seekerId}`);
  }

  getActiveSessionsSolver(solverId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Message/activesessionsolver/${solverId}`);
  }
  getMessagesBySessionId(sessionId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Message/getMessagesBySessionId/${sessionId}`);
  }
  sendSessionMessage(data: sendSessionMessage): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Message/postMessage`, data);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AskQuery, sendSessionMessage, Tag } from 'src/app/models/tag.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private baseUrl = environment.api;

  constructor(private http: HttpClient) {}

  sendMessage(data: AskQuery): Observable<any> {
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
  getAllSessionsSeeker(seekerId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Message/getallsessionsseeker/${seekerId}`);
  }

  getAllSessionsSolver(solverId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Message/getallsessionssolver/${solverId}`);
  }
  getMessagesBySessionId(sessionId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Message/getMessagesBySessionId/${sessionId}`);
  }
  sendSessionMessage(data: sendSessionMessage): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Message/postMessage`, data);
  }
}
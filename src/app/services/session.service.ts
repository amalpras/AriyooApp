import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private selectedSessionIdSource = new BehaviorSubject<number>(0);
  selectedSessionId$ = this.selectedSessionIdSource.asObservable();

  setSelectedSessionId(sessionId: number) {
    this.selectedSessionIdSource.next(sessionId);
  }
}
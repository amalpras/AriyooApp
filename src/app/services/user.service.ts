import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  updateUsername(userId: number, newUsername: string): Observable<boolean> {
    // Mock implementation
    return of(true);
  }

  toggleGuruMode(userId: number, isGuru: boolean): Observable<boolean> {
    // Mock implementation
    return of(true);
  }
}
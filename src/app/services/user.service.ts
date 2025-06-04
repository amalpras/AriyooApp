import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators'; // Added for potential future use, of already present

// Define a simple interface for User objects for search results
interface SearchUser {
  id: number;
  userName: string;
  email: string;
  // Add other relevant properties if needed for search display
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private mockUsers: SearchUser[] = [
    { id: 1, userName: 'AliceSmith', email: 'alice@example.com' },
    { id: 2, userName: 'BobJohnson', email: 'bob@example.com' },
    { id: 3, userName: 'CharlieBrown', email: 'charlie@example.com' },
    { id: 4, userName: 'DianaPrince', email: 'diana@example.com' },
    { id: 5, userName: 'EdwardRichtofen', email: 'edward@example.com' },
    { id: 6, userName: 'FionaGallagher', email: 'fiona@example.com' },
    { id: 7, userName: 'GeorgeLucas', email: 'george@example.com' },
    { id: 8, userName: 'HelenTroy', email: 'helen@example.com' },
    { id: 9, userName: 'IanMalcolm', email: 'ian@example.com' },
    { id: 10, userName: 'JuliaChild', email: 'julia@example.com' }
  ];

  updateUsername(userId: number, newUsername: string): Observable<boolean> {
    const userDataString = localStorage.getItem('loggedin_user');

    if (!userDataString) {
      return throwError(() => new Error('User not found in localStorage'));
    }

    try {
      const userData = JSON.parse(userDataString);

      // In a real app, the backend would handle ID verification.
      // For this mock service, we ensure the localStorage data matches the intended user.
      if (userData.id !== userId) {
        console.error('User ID mismatch. Cannot update username.');
        return throwError(() => new Error('User ID mismatch'));
      }

      userData.userName = newUsername; // Assuming the property is userName
      // If the property in localStorage is different, e.g., 'username', adjust here.
      // Based on ProfileComponent, it is `userName`.

      localStorage.setItem('loggedin_user', JSON.stringify(userData));
      return of(true);
    } catch (error) {
      console.error('Error processing user data from localStorage:', error);
      return throwError(() => new Error('Error processing user data'));
    }
  }

  toggleGuruMode(userId: number, isGuru: boolean): Observable<boolean> {
    // Mock implementation
    return of(true);
  }

  searchUsers(searchTerm: string): Observable<SearchUser[]> {
    const trimmedSearchTerm = searchTerm.trim();

    if (!trimmedSearchTerm) {
      return of([]);
    }

    const lowerSearchTerm = trimmedSearchTerm.toLowerCase();
    const results = this.mockUsers.filter(user =>
      user.userName.toLowerCase().includes(lowerSearchTerm)
    );

    return of(results);
  }
}
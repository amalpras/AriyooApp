import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserTag, UserPlace, UserPlaceTag } from '../models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private apiUrl = 'your-api-url';

  constructor(private http: HttpClient) {}

  getUserTags(userId: number): Observable<UserTag[]> {
    return of([
      { tagId: 1, userId: userId, tagName: 'travel', name: 'Travel' },
      { tagId: 2, userId: userId, tagName: 'food', name: 'Food' }
    ]);
  }

  getUserPlaces(userId: number): Observable<UserPlace[]> {
    return of([
      { placeId: 1, userId: userId, placeName: 'Kerala', name: 'Kerala' },
      { placeId: 2, userId: userId, placeName: 'Goa', name: 'Goa' }
    ]);
  }

  getUserPlaceTags(userId: number): Observable<UserPlaceTag[]> {
    return of([
      { placeTagId: 1, userId: userId, tagName: 'beaches', name: 'Beaches' },
      { placeTagId: 2, userId: userId, tagName: 'mountains', name: 'Mountains' }
    ]);
  }

  // Tag methods
  addUserTag(userId: number, tagName: string): Observable<UserTag> {
    return this.http.post<UserTag>(`${this.apiUrl}/users/${userId}/tags`, { name: tagName });
  }

  deleteUserTag(userId: number, tagId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${userId}/tags/${tagId}`);
  }

  // Place methods
  addUserPlace(userId: number, placeName: string): Observable<UserPlace> {
    return this.http.post<UserPlace>(`${this.apiUrl}/users/${userId}/places`, { name: placeName });
  }

  deleteUserPlace(userId: number, placeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${userId}/places/${placeId}`);
  }

  // Place Tag methods
  addUserPlaceTag(userId: number, placeTagName: string): Observable<UserPlaceTag> {
    return this.http.post<UserPlaceTag>(`${this.apiUrl}/users/${userId}/place-tags`, { name: placeTagName });
  }

  deleteUserPlaceTag(userId: number, placeTagId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${userId}/place-tags/${placeTagId}`);
  }
}
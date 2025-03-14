import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserTag, UserPlace, UserPlaceTag } from '../models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
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

  deleteUserTag(userId: number, tagId: number): Observable<boolean> {
    // Mock implementation
    return of(true);
  }

  deleteUserPlace(userId: number, placeId: number): Observable<boolean> {
    // Mock implementation
    return of(true);
  }

  deleteUserPlaceTag(userId: number, placeTagId: number): Observable<boolean> {
    // Mock implementation
    return of(true);
  }
}
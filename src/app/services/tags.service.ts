import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserTag, UserPlace, UserPlaceTag } from '../models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  getUserTags(userId: number): Observable<UserTag[]> {
    // Mock implementation
    return of([
      { tagId: 1, userId: userId, tagName: 'travel' },
      { tagId: 2, userId: userId, tagName: 'food' }
    ]);
  }

  getUserPlaces(userId: number): Observable<UserPlace[]> {
    // Mock implementation
    return of([
      { placeId: 1, userId: userId, placeName: 'Kerala' },
      { placeId: 2, userId: userId, placeName: 'Goa' }
    ]);
  }

  getUserPlaceTags(userId: number): Observable<UserPlaceTag[]> {
    // Mock implementation
    return of([
      { placeTagId: 1, userId: userId, tagName: 'beaches' },
      { placeTagId: 2, userId: userId, tagName: 'mountains' }
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
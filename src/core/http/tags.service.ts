import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Place, Tag, UserPlace, UserPlaceTag, UserTag } from 'src/app/models/tag.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private baseUrl = environment.api;

  constructor(private http: HttpClient) {}

  // Method to get the list of tags
  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.baseUrl}/api/Tags/getAll`);
  }
  getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(`${this.baseUrl}/api/Tags/place`);
  }

  addUserPlace(userPlace: UserPlace): Observable<UserPlace> {
    return this.http.post<UserPlace>(`${this.baseUrl}/api/Tags/addUserPlace`, userPlace);
  }

  addUserPlaceTag(userPlaceTag: UserPlaceTag): Observable<UserPlaceTag> {
    return this.http.post<UserPlaceTag>(`${this.baseUrl}/api/Tags/addUserPlaceTag`, userPlaceTag);
  }

  getUserTags(userId: number): Observable<UserTag[]> {
    return this.http.get<UserTag[]>(`${this.baseUrl}/api/Tags/getUserTags/${userId}`);
  }

  getUserPlaces(userId: number): Observable<UserPlace[]> {
    return this.http.get<UserPlace[]>(`${this.baseUrl}/api/Tags/getUserPlaces/${userId}`);
  }

  getUserPlaceTags(userId: number): Observable<UserPlaceTag[]> {
    return this.http.get<UserPlaceTag[]>(`${this.baseUrl}/api/Tags/getUserPlaceTags/${userId}`);
  }

  addUserTags(userTags: UserTag[]): Observable<{message: string}> {
    return this.http.post<{message: string}>(`${this.baseUrl}/api/Tags/addUserTags`, userTags);
  }

  deleteUserPlace(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/api/Tags/deleteUserPlace/${id}`);
  }

  deleteUserPlaceTag(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/api/Tags/deleteUserPlaceTag/${id}`);
  }

  deleteUserTag(userId: number, tagId: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/api/Tags/deleteUserTag/${userId}/${tagId}`);
  }
}
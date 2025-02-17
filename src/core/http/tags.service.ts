import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from 'src/app/models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private baseUrl = 'http://localhost:5296';

  constructor(private http: HttpClient) {}

  // Method to get the list of tags
  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.baseUrl}/api/Tags/getAll`);
  }
}
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  createdAt: Date;
  published: boolean;
  tags: string[];
}

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [
    { id: 1, title: 'How do I get started as a data analyst?', excerpt: 'Looking for a roadmap and resources...', content: 'Full content of the post here...', createdAt: new Date(), published: true, tags: ['data', 'career'] },
    { id: 2, title: 'Best cafes to work in Bangalore?', excerpt: 'Suggestions for quiet work-friendly cafes', content: 'Full content here...', createdAt: new Date(), published: true, tags: ['bangalore', 'work', 'cafes'] },
    { id: 3, title: 'How to switch to product management?', excerpt: 'What skills do I need...', content: 'Full content here...', createdAt: new Date(), published: false, tags: ['career', 'pm'] },
  ];

  getPosts(): Observable<Post[]> {
    return of(this.posts.filter(p => p.published));
  }

  getPostById(id: number): Observable<Post | undefined> {
    return of(this.posts.find(p => p.id === id));
  }
}
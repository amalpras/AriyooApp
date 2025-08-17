import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService, Post } from './posts.service';

@Component({
  selector: 'app-posts-list',
  template: `
    <app-base-layout>
      <div class="max-w-5xl mx-auto p-4">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-semibold text-white">Community Posts</h2>
          <div class="flex gap-2">
            <input [(ngModel)]="query" placeholder="Search posts" class="px-3 py-2 rounded-md bg-white/10 text-white placeholder-gray-400 border border-white/10" />
            <button (click)="refresh()" class="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Refresh</button>
          </div>
        </div>

        <div class="grid gap-4">
          <div *ngFor="let p of filteredPosts()" class="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10">
            <div class="flex items-start justify-between">
              <div>
                <a [routerLink]="['/posts', p.id]" class="text-lg font-medium text-white hover:underline">{{ p.title }}</a>
                <p class="text-gray-300 text-sm mt-1">{{ p.excerpt }}</p>
                <div class="mt-2 flex gap-2">
                  <span *ngFor="let t of p.tags" class="text-xs text-blue-300 bg-blue-500/10 px-2 py-1 rounded-full">#{{t}}</span>
                </div>
              </div>
              <div class="text-right">
                <div class="text-gray-400 text-xs">{{ p.createdAt | date:'short' }}</div>
                <div class="mt-2">
                  <span class="text-xs px-2 py-1 rounded-full" [ngClass]="p.published ? 'bg-green-600/30 text-green-200' : 'bg-gray-600/30 text-gray-300'">{{ p.published ? 'Published' : 'Private' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </app-base-layout>
  `
})
export class PostsListComponent implements OnInit {
  posts: Post[] = [];
  query = '';

  constructor(private postsService: PostsService, private router: Router) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.postsService.getPosts().subscribe(posts => this.posts = posts);
  }

  filteredPosts() {
    const q = this.query.toLowerCase();
    return this.posts.filter(p => !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.join(',').toLowerCase().includes(q));
  }
}
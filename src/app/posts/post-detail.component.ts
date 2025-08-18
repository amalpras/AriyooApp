import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService, Post } from './posts.service';

@Component({
  selector: 'app-post-detail',
  template: `
    <app-base-layout>
      <div class="max-w-3xl mx-auto p-4">
        <a routerLink="/posts" class="text-blue-300 hover:underline">← Back to Posts</a>
        <div *ngIf="post" class="mt-4 bg-white/5 border border-white/10 rounded-lg p-6">
          <h1 class="text-3xl font-bold text-white">{{ post.title }}</h1>
          <div class="mt-2 text-gray-400 text-sm">{{ post.createdAt | date:'medium' }}</div>
          <div class="mt-3 flex gap-2">
            <span *ngFor="let t of post.tags" class="text-xs text-blue-300 bg-blue-500/10 px-2 py-1 rounded-full">#{{t}}</span>
          </div>
          <p class="mt-4 text-gray-200">{{ post.content }}</p>
        </div>

        <div class="mt-6 bg-white/5 border border-white/10 rounded-lg p-4">
          <h3 class="text-white font-semibold mb-2">Comments</h3>
          <p class="text-gray-400">Coming soon...</p>
        </div>
      </div>
    </app-base-layout>
  `
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;

  constructor(private route: ActivatedRoute, private postsService: PostsService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postsService.getPostById(id).subscribe(p => this.post = p || null);
  }
}
import { Component, OnInit } from '@angular/core';
import { TagsService } from 'src/core/http/tags.service';
import { Tag } from 'src/app/models/tag.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tags: Tag[] = [];

  constructor(private tagsService: TagsService) {}

  ngOnInit(): void {
    this.getAllTags();
  }

  private getAllTags(): void {
    this.tagsService.getTags().subscribe({
      next: (tags) => {
        this.tags = tags;
        console.log('Tags loaded:', tags);
      },
      error: (error) => {
        console.error('Error loading tags:', error);
      }
    });
  }
}

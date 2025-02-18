import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TagsService } from 'src/core/http/tags.service';
import { Tag } from 'src/app/models/tag.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('messageInput') messageInput!: ElementRef;
  
  tags: Tag[] = [];
  message: string = '';
  showTagSuggestions: boolean = false;
  filteredTags: Tag[] = [];
  selectedTags: Tag[] = [];
  cursorPosition: number = 0;
  isTypingTag: boolean = false;
  currentTagInput: string = '';

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

  onMessageInput(event: any): void {
    const input = event.target;
    this.cursorPosition = input.selectionStart;
    const textBeforeCursor = this.message.slice(0, this.cursorPosition);
    const lastHashIndex = textBeforeCursor.lastIndexOf('#');

    if (lastHashIndex !== -1) {
      const textAfterHash = textBeforeCursor.slice(lastHashIndex + 1);
      if (!textAfterHash.includes(' ')) {
        this.isTypingTag = true;
        this.currentTagInput = textAfterHash;
        this.filterTags(textAfterHash);
        return;
      }
    }

    this.isTypingTag = false;
    this.showTagSuggestions = false;
  }

  private filterTags(query: string): void {
    this.filteredTags = this.tags.filter((tag:Tag) => {
      return tag.tagName.toLowerCase().includes(query.toLowerCase())}
    );
    this.showTagSuggestions = this.filteredTags.length > 0;
  }

  selectTag(tag: Tag): void {
    // Get the text before and after cursor
    const textBeforeCursor = this.message.slice(0, this.cursorPosition);
    const lastHashIndex = textBeforeCursor.lastIndexOf('#');
    const textAfterCursor = this.message.slice(this.cursorPosition);
    
    // Remove the tag text including the # symbol
    this.message = textBeforeCursor.slice(0, lastHashIndex) + textAfterCursor;
    
    // Add to selected tags if not already present
    if (!this.selectedTags.some(t => t.tagName === tag.tagName)) {
        this.selectedTags.push(tag);
    }
    
    this.showTagSuggestions = false;
    this.isTypingTag = false;
    
    // Set focus back to input and adjust cursor position
    setTimeout(() => {
        this.messageInput.nativeElement.focus();
        const newCursorPosition = lastHashIndex;
        this.messageInput.nativeElement.setSelectionRange(newCursorPosition, newCursorPosition);
    });
  }

  // Add this new method to the HomeComponent class
  removeTag(tagToRemove: Tag): void {
    this.selectedTags = this.selectedTags.filter(tag => tag.tagName !== tagToRemove.tagName);
  }
}

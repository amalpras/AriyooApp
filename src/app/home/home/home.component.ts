import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TagsService } from 'src/core/http/tags.service';
import { AskQuery, Place, Session, Tag } from 'src/app/models/tag.model';
import { Router } from '@angular/router';
import { MessagesService } from 'src/core/http/messages.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('messageInput') messageInput!: ElementRef;
  
  tags: Tag[] = [];
  places: Place[] = []; 
  message: string = '';
  showTagSuggestions: boolean = false;
  filteredTags: Tag[] = [];
  selectedTags: Tag[] = [];
  cursorPosition: number = 0;
  isTypingTag: boolean = false;
  currentTagInput: string = '';
  isNavbarVisible: boolean = true;
  allSessions: Session[] = [];
  userMode: string = 'seeker';

  constructor(
    private tagsService: TagsService, 
    private router: Router, 
    private messageService: MessagesService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.getAllTags();
    this.getAllPlaces();
    this.sessionService.userMode$.subscribe(mode => {
      this.userMode = mode;
      this.getAllSessions();
    });
  }

  private getAllTags(): void {
    this.tagsService.getTags().subscribe({
      next: (tags) => {
        this.tags = tags;
      },
      error: (error) => {
        console.error('Error loading tags:', error);
      }
    });
  }

  private getAllPlaces(): void {
    this.tagsService.getPlaces().subscribe({
      next: (places) => {
        this.places = places;},
      error: (error) => {
        console.error('Error loading places:', error);
      }
    })
  }

  getAllSessions() {
    const loggedInUser = localStorage.getItem('loggedin_user');
    if (!loggedInUser) {
      this.router.navigate(['/login']);
      return;
    }
    const user = JSON.parse(loggedInUser);
    if(this.userMode === 'seeker'){
        this.getAllSessionsSeeker(user.userId);
    } else {
        this.getAllSessionsSolver(user.userId);
    }
  }

  getAllSessionsSeeker(seekerId: number) {  
    this.messageService.getAllSessionsSeeker(seekerId.toString()).subscribe(
      (data: any[]) => {
        this.allSessions = data;
      },
      (error) => {
        console.error('Error fetching active sessions for seeker:', error);
      }
    );
  } 

  getAllSessionsSolver(solverId: number) {
    this.messageService.getAllSessionsSolver(solverId.toString()).subscribe(
      (data: any[]) => {
        this.allSessions = data;
      },
      (error) => {
        console.error('Error fetching active sessions for solver:', error);
      }
    );
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
    let filteredPlaces = this.places.filter((place:Place) => { 
      return place.placeName.toLowerCase().includes(query.toLowerCase())}
    );

    this.filteredTags.forEach((element:Tag) => {
      element.description = 'tag';
    });

    filteredPlaces.forEach((place:Place) => {
      let tag: Tag = { id: place.id, tagName: place.placeName, description: 'place' }; 
      this.filteredTags.push(tag);
    });
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

  askQuery(): void {
    const loggedInUser = localStorage.getItem('loggedin_user');
    if (!loggedInUser) {
      this.router.navigate(['/login']);
      return;
    }
    const askQuery: AskQuery = {
      seekerId: JSON.parse(loggedInUser).userId,
      message: this.message,
      tag: this.selectedTags
    }
    this.messageService.sendMessage(askQuery).subscribe({next:(res:any) => {console.log(res);this.router.navigate(['/chat']);}, error: (err:any) => {alert("error");}});  
  }

  toggleNavbar(): void {
    this.isNavbarVisible = !this.isNavbarVisible;
  }

}

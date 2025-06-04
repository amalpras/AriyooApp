import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable, Subscription } from 'rxjs';

// Define a simple interface for User objects for search results
// (Ideally, this would be imported from a shared models file or from user.service.ts if exported)
interface SearchUser {
  id: number;
  userName: string;
  email: string;
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnDestroy {
  public searchTerm: string = '';
  public searchResults: SearchUser[] = [];
  private searchSubscription: Subscription | undefined; // Use undefined for explicit initialization
  public searchAttempted: boolean = false; // To track if a search has been made

  constructor(private userService: UserService) { }

  onSearchTermChange(): void {
    console.log('Search term changed:', this.searchTerm);
    // For now, search is only triggered by the button.
    // If live search is desired, call performSearch() here, possibly with debounce.
    // this.performSearch();
  }

  performSearch(): void {
    this.searchAttempted = true; // Mark that a search has been attempted

    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }

    // If searchTerm is empty, userService.searchUsers will return of([])
    // So, no need for an extra check here unless specific UI behavior is desired for empty term before calling service
    this.searchSubscription = this.userService.searchUsers(this.searchTerm)
      .subscribe({
        next: (results) => {
          this.searchResults = results;
          console.log('Search results:', results);
        },
        error: (err) => {
          console.error('Error searching users:', err);
          this.searchResults = []; // Clear results on error
        }
      });
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}

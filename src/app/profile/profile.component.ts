import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { TagsService } from '../services/tags.service';
import { UserTag, UserPlace, UserPlaceTag } from '../models/tag.model';

interface User {
  id: number;
  userName: string;
  email: string;
  isSolver: boolean;
  seekerRating: number;
  solverRating: number;
  questionsAsked: number;
  questionsAnswered: number;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = {
    id: 0,
    userName: '',
    email: '',
    isSolver: false,
    seekerRating: 0,
    solverRating: 0,
    questionsAsked: 0,
    questionsAnswered: 0
  };
  isEditingUsername = false;
  editedUsername = '';
  userTags: UserTag[] = [];
  userPlaces: UserPlace[] = [];
  userPlaceTags: UserPlaceTag[] = [];
  showAddTagModal = false;
  showAddPlaceModal = false;
  showAddPlaceTagModal = false;
  newTagName: string = '';
  newPlaceName: string = '';
  newPlaceTagName: string = '';

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly tagsService: TagsService
  ) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('loggedin_user');
    if (!userData) {
      this.router.navigate(['/login']);
      return;
    }

    // Load user data from localStorage for demo
    if (userData) {
      const parsedUser = JSON.parse(userData);
      this.user = {
        ...this.user,
        ...parsedUser,
        seekerRating: 4.5,
        solverRating: 4.8,
        questionsAsked: 15,
        questionsAnswered: 25
      };
      this.editedUsername = this.user.userName;
    }

    // Mock data for demonstration
    this.userTags = [
      { tagId: 1, userId: this.user.id, tagName: 'travel', name: 'Travel' },
      { tagId: 2, userId: this.user.id, tagName: 'food', name: 'Food' },
      { tagId: 3, userId: this.user.id, tagName: 'adventure', name: 'Adventure' }
    ];

    this.userPlaces = [
      { placeId: 1, userId: this.user.id, placeName: 'Kerala', name: 'Kerala' },
      { placeId: 2, userId: this.user.id, placeName: 'Goa', name: 'Goa' },
      { placeId: 3, userId: this.user.id, placeName: 'Mumbai', name: 'Mumbai' }
    ];

    this.userPlaceTags = [
      { placeTagId: 1, userId: this.user.id, tagName: 'beaches', name: 'Beaches' },
      { placeTagId: 2, userId: this.user.id, tagName: 'mountains', name: 'Mountains' },
      { placeTagId: 3, userId: this.user.id, tagName: 'cities', name: 'Cities' }
    ];
  }

  toggleUsernameEdit(): void {
    this.isEditingUsername = !this.isEditingUsername;
    this.editedUsername = this.user.userName;
  }

  saveUsername(): void {
    if (this.editedUsername.trim()) {
      this.user.userName = this.editedUsername.trim();
      this.isEditingUsername = false;
    }
  }

  toggleGuruMode(): void {
    this.user.isSolver = !this.user.isSolver;
    // Update localStorage for demo
    const userData = JSON.parse(localStorage.getItem('loggedin_user') || '{}');
    userData.isSolver = this.user.isSolver;
    localStorage.setItem('loggedin_user', JSON.stringify(userData));
  }

  openAddTagModal(): void {
    this.showAddTagModal = true;
    this.newTagName = '';
  }

  closeAddTagModal(): void {
    this.showAddTagModal = false;
  }

  openAddPlaceModal(): void {
    this.showAddPlaceModal = true;
    this.newPlaceName = '';
  }

  closeAddPlaceModal(): void {
    this.showAddPlaceModal = false;
  }

  openAddPlaceTagModal(): void {
    this.showAddPlaceTagModal = true;
    this.newPlaceTagName = '';
  }

  closeAddPlaceTagModal(): void {
    this.showAddPlaceTagModal = false;
  }

  addNewTag(): void {
    if (this.newTagName.trim()) {
      this.tagsService.addUserTag(this.user.id, this.newTagName).subscribe({
        next: (tag) => {
          this.userTags.push(tag);
          this.closeAddTagModal();
        },
        error: (error) => console.error('Error adding tag:', error)
      });
    }
  }

  addNewPlace(): void {
    if (this.newPlaceName.trim()) {
      this.tagsService.addUserPlace(this.user.id, this.newPlaceName).subscribe({
        next: (place) => {
          this.userPlaces.push(place);
          this.closeAddPlaceModal();
        },
        error: (error) => console.error('Error adding place:', error)
      });
    }
  }

  addNewPlaceTag(): void {
    if (this.newPlaceTagName.trim()) {
      this.tagsService.addUserPlaceTag(this.user.id, this.newPlaceTagName).subscribe({
        next: (placeTag) => {
          this.userPlaceTags.push(placeTag);
          this.closeAddPlaceTagModal();
        },
        error: (error) => console.error('Error adding place tag:', error)
      });
    }
  }

  deleteUserTag(tag: UserTag): void {
    this.tagsService.deleteUserTag(this.user.id, tag.tagId).subscribe({
      next: () => {
        this.userTags = this.userTags.filter(t => t.tagId !== tag.tagId);
      },
      error: (error) => console.error('Error deleting tag:', error)
    });
  }

  deleteUserPlace(place: UserPlace): void {
    this.tagsService.deleteUserPlace(this.user.id, place.placeId).subscribe({
      next: () => {
        this.userPlaces = this.userPlaces.filter(p => p.placeId !== place.placeId);
      },
      error: (error) => console.error('Error deleting place:', error)
    });
  }

  deleteUserPlaceTag(placeTag: UserPlaceTag): void {
    this.tagsService.deleteUserPlaceTag(this.user.id, placeTag.placeTagId).subscribe({
      next: () => {
        this.userPlaceTags = this.userPlaceTags.filter(pt => pt.placeTagId !== placeTag.placeTagId);
      },
      error: (error) => console.error('Error deleting place tag:', error)
    });
  }
}

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

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly tagsService: TagsService
  ) { }

  ngOnInit() {
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
        // Mock data for demonstration
        seekerRating: 4.5,
        solverRating: 4.8,
        questionsAsked: 15,
        questionsAnswered: 25
      };
      this.editedUsername = this.user.userName;
    }

    // Mock data for demonstration
    this.userTags = [
      { tagId: 1, userId: this.user.id, tagName: 'travel' },
      { tagId: 2, userId: this.user.id, tagName: 'food' },
      { tagId: 3, userId: this.user.id, tagName: 'adventure' }
    ];

    this.userPlaces = [
      { placeId: 1, userId: this.user.id, placeName: 'Kerala' },
      { placeId: 2, userId: this.user.id, placeName: 'Goa' },
      { placeId: 3, userId: this.user.id, placeName: 'Mumbai' }
    ];

    this.userPlaceTags = [
      { placeTagId: 1, userId: this.user.id, tagName: 'beaches' },
      { placeTagId: 2, userId: this.user.id, tagName: 'mountains' },
      { placeTagId: 3, userId: this.user.id, tagName: 'cities' }
    ];
  }

  toggleUsernameEdit(): void {
    if (this.isEditingUsername) {
      this.updateUsername();
    }
    this.isEditingUsername = !this.isEditingUsername;
  }

  updateUsername(): void {
    if (this.editedUsername.trim()) {
      this.user.userName = this.editedUsername.trim();
      // Update localStorage for demo
      const userData = JSON.parse(localStorage.getItem('loggedin_user') || '{}');
      userData.userName = this.user.userName;
      localStorage.setItem('loggedin_user', JSON.stringify(userData));
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
  }

  openAddPlaceModal(): void {
    this.showAddPlaceModal = true;
  }

  openAddPlaceTagModal(): void {
    this.showAddPlaceTagModal = true;
  }

  deleteUserTag(tag: UserTag): void {
    this.userTags = this.userTags.filter(t => t.tagId !== tag.tagId);
  }

  deleteUserPlace(place: UserPlace): void {
    this.userPlaces = this.userPlaces.filter(p => p.placeId !== place.placeId);
  }

  deleteUserPlaceTag(placeTag: UserPlaceTag): void {
    this.userPlaceTags = this.userPlaceTags.filter(pt => pt.placeTagId !== placeTag.placeTagId);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/core/http/user.service';
import { TagsService } from 'src/core/http/tags.service';
import { UserTag, UserPlace, UserPlaceTag } from 'src/app/models/tag.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  isEditingUsername = false;
  editedUsername = '';
  userTags: UserTag[] = [];
  userPlaces: UserPlace[] = [];
  userPlaceTags: UserPlaceTag[] = [];

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly tagsService: TagsService
  ) { } 

  ngOnInit() {
    const userData = localStorage.getItem('loggedin_user');
    if (!userData) {
      this.router.navigate(['/login']);
    }

    if (userData) {
      const parsedData = JSON.parse(userData);
      this.loadUserData(parsedData);
    }
  }

  private loadUserData(userr: any) {
    this.user = userr;
    const userId = this.user.id;
    
    this.tagsService.getUserTags(userId).subscribe({
      next: (tags) => this.userTags = tags,
      error: (error) => console.error('Error loading user tags:', error)
    });

    this.tagsService.getUserPlaces(userId).subscribe({
      next: (places) => this.userPlaces = places,
      error: (error) => console.error('Error loading user places:', error)
    });

    this.tagsService.getUserPlaceTags(userId).subscribe({
      next: (placeTags) => this.userPlaceTags = placeTags,
      error: (error) => console.error('Error loading user place tags:', error)
    });
  }

  toggleUsernameEdit() {
    this.isEditingUsername = !this.isEditingUsername;
    if (this.isEditingUsername) {
      this.editedUsername = this.user.userName || '';
    }
  }

  updateUsername() {
    if (!this.editedUsername) return;
    
    const updatedUser = { ...this.user, userName: this.editedUsername };
    this.userService.updateUser(updatedUser).subscribe({
      next: (response) => {
        this.user = response;
        localStorage.setItem('loggedin_user', JSON.stringify(response));
        this.isEditingUsername = false;
      },
      error: (error) => {
        console.error('Error updating username:', error);
      }
    });
  }

  toggleGuruMode() {
    const updatedUser = { ...this.user, isSolver: !this.user.isSolver };
    this.userService.updateUser(updatedUser).subscribe({
      next: (response) => {
        this.user = response;
        localStorage.setItem('loggedin_user', JSON.stringify(response));
      },
      error: (error) => {
        console.error('Error updating guru mode:', error);
      }
    });
  }

  openAddTagModal() {
    // Implement modal logic for adding tags
  }

  openAddPlaceModal() {
    // Implement modal logic for adding places
  }

  openAddPlaceTagModal() {
    // Implement modal logic for adding place tags
  }

  deleteUserTag(tag: UserTag) {
    this.tagsService.deleteUserTag(tag.userId, tag.tagId).subscribe({
      next: (response) => {
        this.userTags = this.userTags.filter(t => t.tagId !== tag.tagId);
      },
      error: (error) => {        
        console.error('Error deleting user tag:', error);
      } 
    });
  }

  deleteUserPlace(place: UserPlace) {
    // Implement delete logic
  }

  deleteUserPlaceTag(placeTag: UserPlaceTag) {
    // Implement delete logic
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  guru: any = null;
  isGuru: boolean = false;

  ngOnInit() {
    const userData = localStorage.getItem('loggedin_user');
    if (userData) {
      const parsedData = JSON.parse(userData);
      this.isGuru = !parsedData.isSeeker;
      // Load user data from your service
      this.loadUserData(parsedData.userId);
    }
  }

  private loadUserData(userId: string) {
    // Implement your user data loading logic here
    // This should make an API call to get the user's profile data
  }
}

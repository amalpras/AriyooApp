import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor(private readonly router:Router) { } 

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
  }
}

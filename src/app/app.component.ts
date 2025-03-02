import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private readonly router:Router) {}

  ngOnInit() {
    const userData = localStorage.getItem('loggedin_user');
    if (!userData) {
      this.router.navigate(['/login']);
    }
    
  }

  
}
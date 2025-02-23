import { Component, OnInit } from '@angular/core';

interface Session {
  id: string;
  name: string;
  lastMessage: string;
  isActive: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  sessions: Session[] = [
    {
      id: '1',
      name: 'Travel Guide - Kerala',
      lastMessage: 'What are the best places to visit?',
      isActive: true
    },
    // Add more sessions as needed
  ];

  constructor() { }

  ngOnInit(): void {
    // Fetch sessions from your service here
  }
}

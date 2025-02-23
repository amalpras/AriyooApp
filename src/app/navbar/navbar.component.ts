import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../models/tag.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() toggleNavbar = new EventEmitter<void>();
  @Input() allSessions: Session[] = [];

  constructor(private router: Router) { }

  onToggleNavbar(): void {
    this.toggleNavbar.emit();
  }
}

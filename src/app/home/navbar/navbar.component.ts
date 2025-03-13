import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../../models/session.model';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() toggleNavbar = new EventEmitter<void>();
  @Input() allSessions: Session[] = [];
  @Input() isNavbarVisible: boolean = false;
  isGuruMode: boolean = true;
  userName: string = '';

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) {
    const loggedInUser = localStorage.getItem('loggedin_user');
    if (!loggedInUser) {
      this.router.navigate(['/login']);
      return;
    }
    this.userName = JSON.parse(loggedInUser).fullName;
   }
  ngOnInit(): void {
    this.sessionService.userMode$.subscribe(mode => { this.isGuruMode = mode === 'guru'; });    
  }

  onToggleNavbar(): void {
    this.toggleNavbar.emit();
  }

  selectSession(sessionId: number): void {
    this.sessionService.setSelectedSessionId(sessionId);
    this.router.navigate(['/chat']);
  }

  toggleMode(): void {
    this.isGuruMode = !this.isGuruMode;
    if (this.isGuruMode) {
      this.sessionService.setUserMode('guru');
    } else {
      this.sessionService.setUserMode('seeker');
    }
  }

  toggle() {
    this.toggleNavbar.emit();
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}

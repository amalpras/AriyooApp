import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../../models/tag.model';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() toggleNavbar = new EventEmitter<void>();
  @Input() allSessions: Session[] = [];
  isGuruMode: boolean = true;

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) { }
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
}

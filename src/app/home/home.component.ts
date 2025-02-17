import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesService } from '../../core/http/messages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  activeSessions: any[] = [];
  selectedSessionId: number = 0; // new property for the selected session ID
  private intervalId: any;

  constructor(
    private messagesService: MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const loggedInUser = localStorage.getItem('loggedin_user');
    if (!loggedInUser) {
      this.router.navigate(['/login']);
      return;
    }
    // We'll refresh active sessions every 5 seconds.
    this.getActiveSessions();
    this.intervalId = setInterval(() => {
      this.getActiveSessions();
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getActiveSessions() {
    const loggedInUser = localStorage.getItem('loggedin_user');
    if (!loggedInUser) {
      this.router.navigate(['/login']);
      return;
    }
    const user = JSON.parse(loggedInUser);
    if(user.isSeeker){
        this.messagesService.getActiveSessionsSeeker(user.userId).subscribe(
          (data: any[]) => {
            this.activeSessions = data;
            // Select the first session by default if none is selected yet.
            if(this.activeSessions.length > 0 && !this.selectedSessionId) {
              this.selectedSessionId = this.activeSessions[0].sessionId;
            }
          },
          (error) => {
            console.error('Error fetching active sessions for seeker:', error);
          }
        );
    } else {
        this.messagesService.getActiveSessionsSolver(user.userId).subscribe(
          (data: any[]) => {
            this.activeSessions = data;
            if(this.activeSessions.length > 0 && !this.selectedSessionId) {
              this.selectedSessionId = this.activeSessions[0].sessionId;
            }
          },
          (error) => {
            console.error('Error fetching active sessions for solver:', error);
          }
        );
    }
  }

  selectSession(sessionId: number): void {
    this.selectedSessionId = sessionId;
  }
}

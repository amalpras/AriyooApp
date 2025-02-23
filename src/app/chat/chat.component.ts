import { AfterViewChecked, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from 'src/core/http/messages.service';
import { TagsService } from 'src/core/http/tags.service';
import { Tag, sendSessionMessage } from '../models/tag.model';
import { SessionService } from '../services/session.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  activeSessions: any[] = [];
  selectedSessionId: number = 0; // new property for the selected session ID
  private intervalId: any;
  private sessionSubscription!: Subscription;

  constructor(
    private messagesService: MessagesService,
    private router: Router,
    private route: ActivatedRoute,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    const loggedInUser = localStorage.getItem('loggedin_user');
    if (!loggedInUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.sessionSubscription = this.sessionService.selectedSessionId$.subscribe(
      sessionId => {
        this.selectedSessionId = sessionId;
      }
    );
    
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

  // Add trackBy function
  trackBySessionId(index: number, session: any): number {
    return session.sessionId;
  }

  // pull request test
}

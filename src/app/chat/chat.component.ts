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
  isGuruMode: boolean = false;
  userMode: string = 'seeker';

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
    
    this.sessionService.userMode$.subscribe(mode => {
      this.userMode = mode;
      this.getAllSessions();
    });
    
    this.intervalId = setInterval(() => {
      this.getAllSessions();
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
  }

  getAllSessions() {
    const loggedInUser = localStorage.getItem('loggedin_user');
    if (!loggedInUser) {
      this.router.navigate(['/login']);
      return;
    }
    const user = JSON.parse(loggedInUser);
    if(this.userMode === 'seeker'){
        this.getAllSessionsSeeker(user.userId);
    } else {
        this.getAllSessionsSolver(user.userId);
    }
  }

  getAllSessionsSeeker(seekerId: number) {  
    this.messagesService.getAllSessionsSeeker(seekerId.toString()).subscribe(
      (data: any[]) => {
        this.activeSessions = data;
      },
      (error) => {
        console.error('Error fetching active sessions for seeker:', error);
      }
    );
  } 

  getAllSessionsSolver(solverId: number) {
    this.messagesService.getAllSessionsSolver(solverId.toString()).subscribe(
      (data: any[]) => {
        this.activeSessions = data;
      },
      (error) => {
        console.error('Error fetching active sessions for solver:', error);
      }
    );
  }

  selectSession(sessionId: number): void {
    this.sessionService.setSelectedSessionId(sessionId);
    this.router.navigate(['/chat']);
  }

  // Add trackBy function
  trackBySessionId(index: number, session: any): number {
    return session.sessionId;
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

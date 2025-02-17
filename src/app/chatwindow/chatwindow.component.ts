import { Component, OnInit, OnDestroy, OnChanges, AfterViewChecked, ElementRef, ViewChild, SimpleChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesService } from 'src/core/http/messages.service';
import { TagsService } from 'src/core/http/tags.service';
import { Tag, PostMessageRequest, sendSessionMessage } from '../models/tag.model';

@Component({
  selector: 'app-chatwindow',
  templateUrl: './chatwindow.component.html',
  styleUrls: ['./chatwindow.component.css']
})
export class ChatwindowComponent implements OnInit, OnDestroy, OnChanges, AfterViewChecked {
  @ViewChild('chatMessages') private chatMessagesContainer!: ElementRef;
  @Input() sessionId: number = 0;
  message: string = '';
  tags: Tag[] = [];
  selectedTags: Tag[] = [];
  messages: any[] = [];
  private intervalId: any;

  constructor(
    private tagsService: TagsService,
    private messagesService: MessagesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getTags();
    if (this.sessionId !== 0) {
      this.getMessages(this.sessionId.toString());
      this.intervalId = setInterval(() => {
        this.getMessages(this.sessionId.toString());
      }, 5000);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sessionId'] && !changes['sessionId'].firstChange) {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      if (this.sessionId !== 0) {
        this.getMessages(this.sessionId.toString());
        this.intervalId = setInterval(() => {
          this.getMessages(this.sessionId.toString());
        }, 5000);
      }
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getTags() {
    this.tagsService.getTags().subscribe(
      (data: Tag[]) => {
        this.tags = data;
      },
      error => {
        console.error('Error fetching tags:', error);
      }
    );
  }

  getMessages(sessionId: string) {
    this.messagesService.getMessagesBySessionId(sessionId).subscribe(
      (data: any[]) => {
        this.messages = data.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      },
      error => {
        console.error('Error fetching messages:', error);
      }
    );
  }

  sendMessage() {
    const loggedInUser = localStorage.getItem('loggedin_user');
    if (!loggedInUser) {
      this.router.navigate(['/login']);
      return;
    }
    const userId = JSON.parse(loggedInUser).userId;
    if (this.message.trim().length > 0 && this.sessionId !== 0) {
      const sendMessageData: sendSessionMessage = {
        senderId: userId,
        messageText: this.message,
        createdAt : new Date(),
        sessionId: this.sessionId
      };

      this.messagesService.sendSessionMessage(sendMessageData).subscribe(
        () => {
          this.getMessages(this.sessionId.toString());
        },
        error => {
          console.error('Error sending message:', error);
        }
      );

      this.message = '';
      this.selectedTags = [];
    } else {
      console.error('Please enter a message and ensure a session is selected.');
    }
  }

  isCurrentUser(senderId: string): boolean {
    const loggedInUser = localStorage.getItem('loggedin_user');
    if (!loggedInUser) return false;
    const user = JSON.parse(loggedInUser);
    return user.userId === senderId;
  }

  formatMessageTime(createdAt: string): string {
    const date = new Date(createdAt);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  private scrollToBottom(): void {
    try {
      this.chatMessagesContainer.nativeElement.scrollTop = this.chatMessagesContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { ChatwindowComponent } from './chatwindow.component';
import { MessagesService } from 'src/core/http/messages.service';
import { TagsService } from 'src/core/http/tags.service';
import { Router } from '@angular/router';

// Mock services
class MockMessagesService {
  getMessagesBySessionId = jasmine.createSpy('getMessagesBySessionId').and.returnValue(of([]));
  sendSessionMessage = jasmine.createSpy('sendSessionMessage').and.returnValue(of({}));
  uploadImage = jasmine.createSpy('uploadImage').and.returnValue(of({}));
}

class MockTagsService {
  getTags = jasmine.createSpy('getTags').and.returnValue(of([]));
}

describe('ChatwindowComponent', () => {
  let component: ChatwindowComponent;
  let fixture: ComponentFixture<ChatwindowComponent>;
  let messagesService: MessagesService;
  let tagsService: TagsService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatwindowComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [
        { provide: MessagesService, useClass: MockMessagesService },
        { provide: TagsService, useClass: MockTagsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatwindowComponent);
    component = fixture.componentInstance;
    messagesService = TestBed.inject(MessagesService);
    tagsService = TestBed.inject(TagsService);
    router = TestBed.inject(Router);
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ userId: 'testUser' }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onFileSelected', () => {
    it('should set selectedFile when a file is selected', () => {
      const mockFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
      const mockEvent = { target: { files: [mockFile] } };

      component.onFileSelected(mockEvent);

      expect(component.selectedFile).toBe(mockFile);
    });

    it('should not set selectedFile if no file is selected', () => {
      const mockEvent = { target: { files: [] } };
      component.selectedFile = null; // ensure it's null before the call

      component.onFileSelected(mockEvent);

      expect(component.selectedFile).toBeNull();
    });
  });

  describe('uploadImage', () => {
    let mockFile: File;

    beforeEach(() => {
      mockFile = new File(['dummy content'], 'test-image.png', { type: 'image/png' });
      component.selectedFile = mockFile;
      component.sessionId = 123;
      // Reset spies before each test if they are modified by the test itself
      (messagesService.uploadImage as jasmine.Spy).calls.reset();
      spyOn(component, 'getMessages').and.callThrough(); // Spy on getMessages
    });

    it('should not call uploadImage if selectedFile is null', () => {
      component.selectedFile = null;
      component.uploadImage();
      expect(messagesService.uploadImage).not.toHaveBeenCalled();
    });

    it('should call messagesService.uploadImage with FormData', () => {
      component.uploadImage();

      expect(messagesService.uploadImage).toHaveBeenCalled();
      const formData = (messagesService.uploadImage as jasmine.Spy).calls.mostRecent().args[0] as FormData;
      expect(formData.get('image')).toEqual(mockFile);
      expect(formData.get('senderId')).toEqual('testUser');
      expect(formData.get('sessionId')).toEqual('123');
    });

    it('should clear selectedFile and call getMessages on successful upload', () => {
      (messagesService.uploadImage as jasmine.Spy).and.returnValue(of({ success: true }));
      component.uploadImage();

      expect(component.selectedFile).toBeNull();
      expect(component.getMessages).toHaveBeenCalledWith('123');
    });

    it('should log an error on failed upload', () => {
      const consoleErrorSpy = spyOn(console, 'error');
      (messagesService.uploadImage as jasmine.Spy).and.returnValue(throwError(() => new Error('Upload failed')));
      component.uploadImage();

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error uploading image:', jasmine.any(Error));
      expect(component.selectedFile).not.toBeNull(); // Should not clear selectedFile on error
    });

    it('should navigate to login if user is not logged in', () => {
      (localStorage.getItem as jasmine.Spy).and.returnValue(null);
      const routerSpy = spyOn(router, 'navigate');
      component.uploadImage();
      expect(routerSpy).toHaveBeenCalledWith(['/login']);
      expect(messagesService.uploadImage).not.toHaveBeenCalled();
    });
  });

  describe('sendMessage', () => {
    beforeEach(() => {
      component.sessionId = 123;
      component.message = 'Test message';
      spyOn(component, 'uploadImage').and.callThrough();
      spyOn(component, 'getMessages').and.callThrough();
      (messagesService.sendSessionMessage as jasmine.Spy).calls.reset();
      (messagesService.uploadImage as jasmine.Spy).calls.reset();
    });

    it('should call uploadImage if selectedFile is present', () => {
      const mockFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
      component.selectedFile = mockFile;

      component.sendMessage();

      expect(component.uploadImage).toHaveBeenCalled();
      expect(messagesService.sendSessionMessage).not.toHaveBeenCalled();
    });

    it('should call messagesService.sendSessionMessage if selectedFile is null and message is present', () => {
      component.selectedFile = null;
      component.sendMessage();

      expect(messagesService.sendSessionMessage).toHaveBeenCalled();
      expect(component.uploadImage).not.toHaveBeenCalled();
      const expectedMessageData = {
        senderId: 'testUser',
        messageText: 'Test message',
        createdAt: jasmine.any(Date),
        sessionId: 123
      };
      expect(messagesService.sendSessionMessage).toHaveBeenCalledWith(expectedMessageData);
      expect(component.getMessages).toHaveBeenCalledWith('123');
      expect(component.message).toBe('');
    });

    it('should not send message if message is empty or whitespace', () => {
      component.selectedFile = null;
      component.message = '   ';
      const consoleErrorSpy = spyOn(console, 'error');

      component.sendMessage();

      expect(messagesService.sendSessionMessage).not.toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith('Please enter a message and ensure a session is selected.');
    });

    it('should navigate to login if user is not logged in and no file is selected', () => {
      (localStorage.getItem as jasmine.Spy).and.returnValue(null);
      const routerSpy = spyOn(router, 'navigate');
      component.selectedFile = null;
      component.sendMessage();
      expect(routerSpy).toHaveBeenCalledWith(['/login']);
      expect(messagesService.sendSessionMessage).not.toHaveBeenCalled();
    });
  });

  // Add other necessary tests for ngOnInit, ngOnChanges, etc. if not already present
  // For example, a simple test for ngOnInit:
  it('should call getTags and getMessages on init if sessionId is present', () => {
    spyOn(component, 'getTags').and.callThrough();
    spyOn(component, 'getMessages').and.callThrough();
    component.sessionId = 1;
    component.ngOnInit();
    expect(component.getTags).toHaveBeenCalled();
    expect(component.getMessages).toHaveBeenCalledWith('1');
  });
});

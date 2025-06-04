import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MessagesService } from './messages.service';
import { environment } from 'src/environments/environment';
import { AskQuery, sendSessionMessage } from 'src/app/models/tag.model';

describe('MessagesService', () => {
  let service: MessagesService;
  let httpMock: HttpTestingController;
  let baseUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MessagesService]
    });
    service = TestBed.inject(MessagesService);
    httpMock = TestBed.inject(HttpTestingController);
    baseUrl = environment.api;
  });

  afterEach(() => {
    httpMock.verify(); // Make sure that there are no outstanding requests.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a message (postQuestion)', () => {
    const mockQuery: AskQuery = {
        tags: [{ tagId: 1, tagName: 'Test Tag', tagDescription: 'Description' }],
        solverId: 'solver123',
        seekerId: 'seeker456',
        question: 'Test question?'
    };
    const mockResponse = { success: true };

    service.sendMessage(mockQuery).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/Message/postQuestion`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockQuery);
    req.flush(mockResponse);
  });

  it('should get messages for seeker', () => {
    const seekerId = 'seeker123';
    const mockResponse = [{ messageId: 1, text: 'Hello' }];

    service.getMessagesSeeker(seekerId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/Message/getMessagesForSeeker/${seekerId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get messages for solver', () => {
    const solverId = 'solver123';
    const mockResponse = [{ messageId: 1, text: 'Hi' }];

    service.getMessagesSolver(solverId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/Message/getMessagesForSolver/${solverId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get active sessions for seeker', () => {
    const seekerId = 'seeker123';
    const mockResponse = [{ sessionId: 's1', status: 'active' }];

    service.getActiveSessionsSeeker(seekerId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/Message/activesessionseeker/${seekerId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get active sessions for solver', () => {
    const solverId = 'solver123';
    const mockResponse = [{ sessionId: 's2', status: 'active' }];

    service.getActiveSessionsSolver(solverId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/Message/activesessionsolver/${solverId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get all sessions for seeker', () => {
    const seekerId = 'seeker123';
    const mockResponse = [{ sessionId: 's3', status: 'closed' }];

    service.getAllSessionsSeeker(seekerId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/Message/getallsessionsseeker/${seekerId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get all sessions for solver', () => {
    const solverId = 'solver123';
    const mockResponse = [{ sessionId: 's4', status: 'closed' }];

    service.getAllSessionsSolver(solverId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/Message/getallsessionssolver/${solverId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get messages by session ID', () => {
    const sessionId = 'session123';
    const mockResponse = [{ messageId: 1, text: 'Test message' }];

    service.getMessagesBySessionId(sessionId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/Message/getMessagesBySessionId/${sessionId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should send a session message (postMessage)', () => {
    const mockMessageData: sendSessionMessage = {
      senderId: 'user1',
      messageText: 'Hello session',
      createdAt: new Date(),
      sessionId: 123
    };
    const mockResponse = { success: true };

    service.sendSessionMessage(mockMessageData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/Message/postMessage`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockMessageData);
    req.flush(mockResponse);
  });

  describe('uploadImage', () => {
    it('should upload an image and return the response', () => {
      const mockFormData = new FormData();
      mockFormData.append('image', new File([''], 'test.jpg'));
      mockFormData.append('senderId', 'user123');
      mockFormData.append('sessionId', 'session456');

      const mockResponse = { imageUrl: 'http://example.com/image.jpg' };

      service.uploadImage(mockFormData).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${baseUrl}/api/Message/uploadImage`);
      expect(req.request.method).toBe('POST');
      // FormData objects are a bit tricky to compare directly with expect(req.request.body).toEqual(mockFormData);
      // Instead, check for the presence of the request and its method.
      // If specific field checks are needed, they would require more complex logic or inspecting req.request.body manually.
      expect(req.request.body).toBeInstanceOf(FormData);
      req.flush(mockResponse);
    });
  });
});

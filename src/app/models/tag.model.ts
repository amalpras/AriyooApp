export interface Tag {
  id: number;
  tagName: string | null;
  description: string | null;
}

export interface PostMessageRequest {
    seekerId: number; 
    message: string;
    tag: Tag[];
  }

  export interface sendSessionMessage {
    senderId: number; 
    messageText: string;
    sessionId: number;
    createdAt: Date;  
  }
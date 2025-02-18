export interface Tag {
  id: number;
  tagName: string;
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

  export interface RegisterUser {
    email: string;
    password: string;
    flname: string;
    isSeeker: boolean;
    isSolver: boolean;
}
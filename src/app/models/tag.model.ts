export interface Tag {
  id: number;
  tagName: string;
  description: string | null;
}

export interface AskQuery {
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

  export interface Place {
    id: number;
    placeName: string;
  }

  export interface Session {  
    sessionId: number;
    seekerId: number;
    solverId: number;
    title: string;
    createdAt: Date;
    active: boolean;
  }
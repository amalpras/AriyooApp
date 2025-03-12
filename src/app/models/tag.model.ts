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
name: any;
lastMessage: any;  
    sessionId: number;
    seekerId: number;
    solverId: number;
    title: string;
    createdAt: Date;
    active: boolean;
  }

  export interface User {
    id: number;
    flname: string;
    email: string;
    password: string;
    isSeeker?: boolean;
    isSolver?: boolean;
    createdAt: Date;
    userName: string;
    Phone?:string;
    PhoneVerified: boolean;
    seekerRating: number;
    questionsAsked: number;
    solverRating: number;
    questionsAnswered: number;
  }

  export interface UpdatePassword {
    userId: number;
    oldPassword: string;
    newPassword: string;
  }

  export interface PlaceTag {
    placeTagId: number;
    placeTagName: string;
}


export interface UserPlaceTag {
  userPlaceTagId: number;
  userId: number;
  placeId: number;
  placeTagId: number;
  place?: Place;
  placeTag?: PlaceTag;
}

export interface UserPlace {
  userPlaceId: number;
  userId: number;
  placeId: number;
  place?: Place;
}
export interface UserTag {
  userId: number;
  user?: User;  
  tagId: number;
  tag?: Tag;
}


  
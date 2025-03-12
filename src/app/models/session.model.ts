export interface Session {
  sessionId: number;
  name: string;
  lastMessage: string;
  seekerId: number;
  solverId: number;
  title: string;
  createdAt: Date;
  active: boolean;
}
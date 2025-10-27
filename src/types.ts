
export interface User {
  id: number;
  name: string;
  avatar: string;
}

export interface Contact extends User {}

export interface Message {
  id: number;
  text: string;
  timestamp: Date;
  senderId: number;
}
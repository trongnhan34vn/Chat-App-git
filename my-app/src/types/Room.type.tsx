import { IChat } from './Chat.type';
import { IUser } from './User.type';

export interface IRoom {
  id: number;
  name: string;
  users: IUser[];
  chats: IChat[];
}

export interface IFormCreateRoom {
  userId: number;
  receiverId: number;
}

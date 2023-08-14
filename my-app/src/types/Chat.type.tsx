import { IUser } from "./User.type";

export interface IChat {
  id: number;
  content: string;
  user: IUser;
  roomId: number;
  createdTime: number;
}

export interface IChatMessage {
  senderEmail: string;
  receiverEmail: string;
  content: string;
  roomId: number;
  chatMessageStatus: string;
}
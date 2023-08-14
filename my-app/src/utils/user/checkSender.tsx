import { IChat } from "../../types/Chat.type";
import { IUser } from "../../types/User.type";

export const checkSender = (chat: IChat, sender: IUser) => {
  if (!sender) return;

  if (chat.user.id === sender.id) {
    return true;
  }
  return false;
};
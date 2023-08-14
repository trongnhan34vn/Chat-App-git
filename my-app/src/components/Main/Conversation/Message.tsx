import React from 'react';
import { IChat } from '../../../types/Chat.type';
import { IUser } from '../../../types/User.type';
import { convertTimeStampToDate } from '../../../utils/time-convert/convertTimeStampToDate';
import { formatDateTime } from '../../../utils/time-convert/formatDateTime';
import { checkSender } from '../../../utils/user/checkSender';

interface MessageProps {
  sender: IUser;
  chat: IChat;
}

const Message = ({ sender, chat }: MessageProps) => {

  return (
    <div
      className={`flex mb-2 ${checkSender(chat, sender) ? 'justify-end' : ''}`}
    >
      <div
        className="rounded py-2 px-3"
        style={
          checkSender(chat, sender)
            ? { backgroundColor: '#E2F7CB' }
            : { backgroundColor: '#F2F2F2' }
        }
      >
        <p className="text-sm mt-1">{chat.content}</p>
        <p className="text-right text-xs text-gray-400 mt-1">{formatDateTime(convertTimeStampToDate(chat.createdTime))}</p>
      </div>
    </div>
  );
};

export default Message;

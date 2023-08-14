import React, { RefObject } from 'react';
import { IRoom } from '../../../types/Room.type';
import { IChat } from '../../../types/Chat.type';
import { IUser } from '../../../types/User.type';
import Message from './Message';

interface MessagesProps {
  room: IRoom | null;
  sender: IUser | null;
  receiver: IUser | null;
  messageRef: RefObject<HTMLDivElement>;
}

const Messages = ({ messageRef, room, sender, receiver }: MessagesProps) => {
  const chats: IChat[] = room ? room.chats : [];

  const chatsOrderByTime = [...chats].sort(
    (a, b) => a.createdTime - b.createdTime
  );

  const chatElement = chatsOrderByTime.map((chat) => {
    if (!sender) return;
    if (!receiver) return;

    return <Message key={chat.id} chat={chat} sender={sender} />;
  });

  return (
    <div
      className="flex-1 overflow-auto"
      style={{ backgroundColor: '#DAD3CC' }}
    >
      <div ref={messageRef} className="py-2 px-3">
        {/* Default Messages */}
        <div className="flex justify-center mb-2">
          <div
            className="rounded py-2 px-4"
            style={{ backgroundColor: '#DDECF2' }}
          >
            <p className="text-sm uppercase">February 20, 2018</p>
          </div>
        </div>
        <div className="flex justify-center mb-4">
          <div
            className="rounded py-2 px-4"
            style={{ backgroundColor: '#FCF4CB' }}
          >
            <p className="text-xs">
              Messages to this chat and calls are now secured with end-to-end
              encryption. Tap for more info.
            </p>
          </div>
        </div>
        {/* Default Messages */}
        {chatElement}
      </div>
    </div>
  );
};

export default Messages;

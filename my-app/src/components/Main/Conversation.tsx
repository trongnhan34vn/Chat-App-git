import React, { useEffect, useRef, useState } from 'react';
import Header from './Conversation/Header';
import Messages from './Conversation/Messages';
import FormMessage from './Conversation/FormMessage';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { over } from 'stompjs';
import { getCurrentUser } from '../../utils/user/getCurrentUser';
import { useDispatch, useSelector } from 'react-redux';
import { roomSelector } from '../../redux/selectors';
import { getReceiver } from '../../utils/user/getReceiver';
import { IChat, IChatMessage } from '../../types/Chat.type';
import { AppDispatch } from '../../redux/store';
import { getRoomResult } from '../../redux/reducers/roomSlice';
import { scrollToBottom } from '../../utils/scroll/scrollToBottom';

let stompClient: Stomp.Client | null = null;
const Conversation = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentUser = getCurrentUser();
  const room = useSelector(roomSelector).roomResult;
  const receiver = room ? getReceiver(currentUser, room.users) : null;

  useEffect(() => {
    if (!currentUser) return;
    connect();
  }, []);

  const connect = () => {
    let Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  // ON_ERROR_CONNECT
  const onError = (error: any) => {
    console.log(error);
  };

  // ON_CONECTED_SUCESSFULLY
  const onConnected = () => {
    if (!stompClient) return;
    if (!currentUser) return;

    stompClient.subscribe(
      '/user/' + currentUser.email + '/private',
      onPrivateMessageReceived
    );
  };

  const onPrivateMessageReceived = (payload: any) => {
    let receivedValue = JSON.parse(payload.body);
    console.log(receivedValue);
    dispatch(getRoomResult(receivedValue));
  };

  const onSendMessage = (content: string) => {
    if (!stompClient) return;
    if (!room) return;
    if (!currentUser) return;
    let sender = currentUser;
    if (!receiver) return;
    let chat: IChatMessage = {
      senderEmail: sender.email,
      receiverEmail: receiver.email,
      roomId: room.id,
      chatMessageStatus: 'MESSAGE',
      content: content,
    };
    stompClient.send('/app/private-message', {}, JSON.stringify(chat));
  };

  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom(messageRef);
  },[room])

  return (
    <div className="w-2/3 border bg-[#F4F7F9] flex flex-col">
      {/* Header */}
      <Header />
      {/* Messages */}
      <Messages messageRef={messageRef} sender={currentUser} receiver={receiver} room={room} />
      {/* Input */}
      <FormMessage onSendMessage={onSendMessage} />
    </div>
  );
};

export default Conversation;

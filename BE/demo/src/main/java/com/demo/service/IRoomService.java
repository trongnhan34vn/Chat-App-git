package com.demo.service;

import com.demo.dto.request.ChatMessage;
import com.demo.model.Room;

import java.util.List;

public interface IRoomService extends IGenericService<Room>{
    List<Room> findRoomsByUserId(long userId);
    Room saveChat(ChatMessage chatMessage);
}

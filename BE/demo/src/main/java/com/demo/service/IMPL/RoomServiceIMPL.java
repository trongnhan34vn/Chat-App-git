package com.demo.service.IMPL;

import com.demo.dto.request.ChatMessage;
import com.demo.model.Chat;
import com.demo.model.Room;
import com.demo.model.User;
import com.demo.repository.IRoomRepository;
import com.demo.repository.IUserRepository;
import com.demo.service.IChatService;
import com.demo.service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoomServiceIMPL implements IRoomService {
    private final IRoomRepository roomRepository;
    private final IUserRepository userRepository;
    private final IChatService chatService;

    @Override
    public List<Room> findAll() {
        return roomRepository.findAll();
    }

    @Override
    public Room findById(Long id) {
        Optional<Room> room = roomRepository.findById(id);
        return room.orElse(null);
    }

    @Override
    public Room save(Room room) {
        return roomRepository.save(room);
    }

    @Override
    public void remove(long id) {
        roomRepository.deleteById(id);
    }

    @Override
    public List<Room> findRoomsByUserId(long userId) {
        return roomRepository.findRoomsByUserId(userId);
    }

    @Override
    public Room saveChat(ChatMessage chatMessage) {
        Room room = findById(chatMessage.getRoomId());
        Optional<User> sender = userRepository.findUserByEmailEquals(chatMessage.getSenderEmail());
        Optional<User> receiver = userRepository.findUserByEmailEquals(chatMessage.getReceiverEmail());

        if (!sender.isPresent()) {
            return null;
        }
        if (!receiver.isPresent()) {
            return null;
        }

        Chat chat = Chat.builder()
                .content(chatMessage.getContent())
                .createdTime(System.currentTimeMillis())
                .room(room)
                .user(sender.get())
                .build();

        chatService.save(chat);
        System.out.println(room.getChats());
        save(room);
        return room;
    }
}

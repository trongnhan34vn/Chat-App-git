package com.demo.controller;

import com.demo.dto.request.RoomForm;
import com.demo.dto.response.ResponseMessage;
import com.demo.model.Room;
import com.demo.model.User;
import com.demo.service.IRoomService;
import com.demo.service.IUserService;
import com.demo.utils.ResponseMessBuilder;
import com.demo.utils.RoomUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api/rooms")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class RoomController {

    private final IUserService userService;
    private final IRoomService roomService;

    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody RoomForm roomForm) {
        User user = userService.findById(roomForm.getUserId());
        User receiver = userService.findById(roomForm.getReceiverId());

        List<Room> roomByUserId = roomService.findRoomsByUserId(roomForm.getUserId());
        Room existRoom = RoomUtils.checkRoomExist(roomByUserId, receiver, user);
        if(existRoom != null) {
            return ResponseEntity.status(HttpStatus.OK).body(ResponseMessBuilder.failedMessage("Room existed", existRoom));
        }

        Room room = Room.builder()
                .name(user.getName() + "_" + receiver.getName())
                .users(new ArrayList<>())
                .chats(new ArrayList<>())
                .build();

        Room justAddRoom = roomService.save(room);
        List<User> members = justAddRoom.getUsers();
        members.add(user);
        members.add(receiver);
        justAddRoom.setUsers(members);
        roomService.save(justAddRoom);

        return ResponseEntity.status(HttpStatus.OK).body(ResponseMessBuilder.successMessage("Create Room Success!", justAddRoom));
    }
}

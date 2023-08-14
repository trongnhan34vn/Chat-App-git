package com.demo.utils;

import com.demo.model.Room;
import com.demo.model.User;

import java.util.List;

public class RoomUtils {
    public static Room checkRoomExist (List<Room> rooms, User receiver, User user) {
        for (Room room: rooms) {
            if(checkExist(room, receiver, user)) {
                return room;
            }
        }
        return null;
    }
    private static boolean checkExist (Room room, User receiver, User user) {
        List<User> users = room.getUsers();
        return users.contains(receiver) && users.contains(user);
    }
}

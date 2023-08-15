package com.demo.repository;

import com.demo.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface IRoomRepository extends JpaRepository<Room, Long> {
    @Query(value = "select * from rooms r join room_user ru on r.id = ru.room_id where user_id = ?1",nativeQuery = true)
    List<Room> findRoomsByUserId(long userId);
}

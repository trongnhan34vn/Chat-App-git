package com.demo.dto.request;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class RoomForm {
    private long receiverId;
    private long userId;
}

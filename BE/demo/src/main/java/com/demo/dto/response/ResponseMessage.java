package com.demo.dto.response;


import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseMessage {
    private String status;
    private String message;
    private Object data;
}

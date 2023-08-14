package com.demo.utils;

import com.demo.dto.response.ResponseMessage;

public class ResponseMessBuilder {
    public static ResponseMessage successMessage(String message, Object data) {
        return ResponseMessage.builder()
                .status("success")
                .message(message)
                .data(data)
                .build();
    }

    public static ResponseMessage failedMessage(String message, Object data) {
        return ResponseMessage.builder()
                .status("failed")
                .message(message)
                .data(data)
                .build();
    }
}

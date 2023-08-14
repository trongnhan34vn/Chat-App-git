package com.demo.dto.request;
import com.demo.model.ChatMessageStatus;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class ChatMessage {
    private String senderEmail;
    private String receiverEmail;
    private String content;
    private Long roomId;
    private ChatMessageStatus chatMessageStatus;
}

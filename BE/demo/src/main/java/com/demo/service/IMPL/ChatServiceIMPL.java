package com.demo.service.IMPL;

import com.demo.model.Chat;
import com.demo.repository.IChatRepository;
import com.demo.service.IChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatServiceIMPL implements IChatService {
    private final IChatRepository chatRepository;

    @Override
    public List<Chat> findAll() {
        return chatRepository.findAll();
    }

    @Override
    public Chat findById(Long id) {
        Optional<Chat> chat = chatRepository.findById(id);
        return chat.orElse(null);
    }

    @Override
    public Chat save(Chat chat) {
        return chatRepository.save(chat);
    }

    @Override
    public void remove(long id) {
        chatRepository.deleteById(id);
    }
}

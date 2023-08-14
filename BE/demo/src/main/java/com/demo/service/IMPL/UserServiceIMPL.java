package com.demo.service.IMPL;

import com.demo.dto.request.LoginForm;
import com.demo.dto.request.RegisterForm;
import com.demo.model.User;
import com.demo.repository.IUserRepository;
import com.demo.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceIMPL implements IUserService {

    private final IUserRepository userRepository;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findById(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public void remove(long id) {
        userRepository.deleteById(id);
    }

    @Override
    public Optional<User> register(RegisterForm registerForm) {
        if (existsByEmail(registerForm.getEmail())) {
            return Optional.empty();
        }
        User newUser = User.builder()
                .email(registerForm.getEmail())
                .name(registerForm.getName())
                .password(registerForm.getPassword())
                .image("https://firebasestorage.googleapis.com/v0/b/md1-test-84536.appspot.com/o/images%2Fpngegg%20(1).png?alt=media&token=ee8f4659-b3bb-420d-84da-e783ac3d07f9")
                .build();
        User savedUser = save(newUser);
        return Optional.ofNullable(savedUser);
    }

    @Override
    public Optional<User> login(LoginForm loginForm) {
        if (existsByEmail(loginForm.getEmail()) && existsByPasswordEquals(loginForm.getPassword())) {
            return userRepository.findUserByEmailEquals(loginForm.getEmail());
        }
        return Optional.empty();
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmailEquals(email);
    }

    @Override
    public boolean existsByPasswordEquals(String password) {
        return userRepository.existsByPasswordEquals(password);
    }
}

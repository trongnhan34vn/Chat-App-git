package com.demo.service;

import com.demo.dto.request.LoginForm;
import com.demo.dto.request.RegisterForm;
import com.demo.model.User;

import java.util.Optional;

public interface IUserService extends IGenericService<User> {
    Optional<User> register(RegisterForm registerForm);
    Optional<User> login(LoginForm loginForm);
    boolean existsByEmail(String email);
    boolean existsByPasswordEquals(String password);

}

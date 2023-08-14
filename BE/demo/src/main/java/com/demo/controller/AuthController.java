package com.demo.controller;

import com.demo.dto.request.LoginForm;
import com.demo.dto.request.RegisterForm;
import com.demo.dto.response.ResponseMessage;
import com.demo.model.User;
import com.demo.service.IUserService;
import com.demo.utils.ResponseMessBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {
    private final IUserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterForm registerForm) {
        Optional<User> responseUser = userService.register(registerForm);
        if (!responseUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(ResponseMessBuilder.failedMessage("Sign up fail!", registerForm));
        }
        return ResponseEntity.status(HttpStatus.OK).body(ResponseMessage.builder().status("success").message("Sign up success!").data(responseUser).build());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginForm loginForm, HttpServletResponse response) {
        Optional<User> responseUser = userService.login(loginForm);
        if (!responseUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(ResponseMessBuilder.failedMessage("Login fail!", loginForm));
        }

        // create a cookie
        Cookie cookie = new Cookie("user", responseUser.get().getId().toString());
        cookie.setMaxAge(7 * 24 * 60 * 60); // expires in 7 days
        //add cookie to response
        response.addCookie(cookie);

        return ResponseEntity.status(HttpStatus.OK).body(ResponseMessBuilder.successMessage("Login success!", responseUser));
    }
}

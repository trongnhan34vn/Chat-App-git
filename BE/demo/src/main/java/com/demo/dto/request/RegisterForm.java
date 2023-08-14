package com.demo.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RegisterForm {
    private String name;
    private String email;
    private String password;
}

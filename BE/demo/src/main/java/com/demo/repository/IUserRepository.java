package com.demo.repository;

import com.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface IUserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByEmailEquals(String email);
    boolean existsByEmailEquals(String email);
    boolean existsByPasswordEquals(String password);
}

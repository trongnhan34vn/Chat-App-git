package com.demo.service;

import java.util.List;
import java.util.Optional;

public interface IGenericService<E> {
    List<E> findAll();
    E findById(Long id);
    E save(E e);
    void remove(long id);
}

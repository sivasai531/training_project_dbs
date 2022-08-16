package com.dbs.spring.backend.repository;

import com.dbs.spring.backend.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, String> {
}

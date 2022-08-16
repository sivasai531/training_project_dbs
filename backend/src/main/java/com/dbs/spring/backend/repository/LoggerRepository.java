package com.dbs.spring.backend.repository;

import com.dbs.spring.backend.model.Logger;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoggerRepository extends JpaRepository<Logger, Integer> {
}

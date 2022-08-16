package com.dbs.spring.backend.repository;

import com.dbs.spring.backend.model.CustomerUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerUserRepository extends JpaRepository<CustomerUser, Integer> {
}

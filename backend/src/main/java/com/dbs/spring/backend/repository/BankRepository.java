package com.dbs.spring.backend.repository;

import com.dbs.spring.backend.model.Bank;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankRepository extends JpaRepository<Bank, String> {
}

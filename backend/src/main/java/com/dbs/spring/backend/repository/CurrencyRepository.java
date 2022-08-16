package com.dbs.spring.backend.repository;

import com.dbs.spring.backend.model.Currency;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CurrencyRepository extends JpaRepository<Currency, String> {
}

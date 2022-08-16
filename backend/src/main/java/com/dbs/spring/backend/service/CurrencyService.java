package com.dbs.spring.backend.service;

import com.dbs.spring.backend.model.Currency;
import com.dbs.spring.backend.repository.CurrencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CurrencyService {
    @Autowired
    private CurrencyRepository currencyRepository;

    public List<Currency> getAllCurrency() {
        return currencyRepository.findAll();
    }
}

package com.dbs.spring.backend.controller;

import com.dbs.spring.backend.model.Currency;
import com.dbs.spring.backend.service.CurrencyService;
import com.dbs.spring.backend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/currency")
public class CurrencyController {
    @Autowired
    private CurrencyService currencyService;

    @GetMapping("/all")
    public List<Currency> getAllCurrency() {
        return currencyService.getAllCurrency();
    }
}

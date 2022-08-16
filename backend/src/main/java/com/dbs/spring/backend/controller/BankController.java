package com.dbs.spring.backend.controller;

import com.dbs.spring.backend.model.Bank;
import com.dbs.spring.backend.service.BankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/bank")
@CrossOrigin
public class BankController {
    @Autowired
    private BankService bankService;

    @GetMapping("/all")
    public List<Bank> getAllBanks() {
        return bankService.getAllBanks();
    }
}

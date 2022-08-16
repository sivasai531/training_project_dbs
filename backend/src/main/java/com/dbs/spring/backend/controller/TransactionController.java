package com.dbs.spring.backend.controller;

import com.dbs.spring.backend.model.Transaction;
import com.dbs.spring.backend.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/submit")
    public List<String> saveTransaction(@RequestBody Transaction transaction) {
        return transactionService.saveTransaction(transaction);
    }

}

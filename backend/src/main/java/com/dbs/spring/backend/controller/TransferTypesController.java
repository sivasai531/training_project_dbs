package com.dbs.spring.backend.controller;

import com.dbs.spring.backend.model.TransferTypes;
import com.dbs.spring.backend.service.TransferTypesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/transfertypes")
public class TransferTypesController {
    @Autowired
    private TransferTypesService transferTypesService;

    @GetMapping("/all")
    public List<TransferTypes> getAllTransferTypes() {
        return transferTypesService.getAllTransferTypes();
    }
}

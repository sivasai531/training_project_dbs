package com.dbs.spring.backend.service;

import com.dbs.spring.backend.model.TransferTypes;
import com.dbs.spring.backend.repository.TransferTypesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransferTypesService {
    @Autowired
    private TransferTypesRepository transferTypesRepository;

    public List<TransferTypes> getAllTransferTypes() {
        return transferTypesRepository.findAll();
    }
}

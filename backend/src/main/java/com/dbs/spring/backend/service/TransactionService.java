package com.dbs.spring.backend.service;

import com.dbs.spring.backend.model.*;
import com.dbs.spring.backend.repository.CustomerRepository;
import com.dbs.spring.backend.repository.TransactionRepository;

import lombok.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.json.simple.JSONObject;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public boolean isAmountSufficient(double senderbalance, double tranasactionamount, double transferfees, double conversionrate) {

        if((transferfees*conversionrate + tranasactionamount*conversionrate) <= senderbalance) {
            return true;
        }
        return false;
    }

    public boolean transferIsValid(String transfertypecode, String receiverbic) {
        if(Objects.equals(transfertypecode, "Customer Transfer")) {
            if(receiverbic.substring(0, 4).equals("HDFC")) {
                return false;
            }
            else {
                return true;
            }
        }
        else if(Objects.equals(transfertypecode, "Bank Transfer")) {
            System.out.println(receiverbic.substring(0, 4));
            if(receiverbic.substring(0, 4).equals("HDFC")) {
                return true;
            }
            else {
                return false;
            }
        }
        return true;
    }

    public boolean presentInSDNList(String receivername) {
        ResourceLoader resourceLoader = new DefaultResourceLoader();
        Resource resource = resourceLoader.getResource("sdnlist.txt");
        // System.out.println(ResourceReader.asString(resource));
        String sdnlist = ResourceReader.asString(resource).toLowerCase();
        if(sdnlist.contains(receivername.toLowerCase())) {
            return true;
        }
        return false;
    }

    public JSONObject formValidation(Transaction transaction) {
        JSONObject jsonResult = new JSONObject();

        // SDN Checklist
        String receivername = transaction.getReceiveraccountholdername();
        jsonResult.put("presentInSDNList", presentInSDNList(receivername));

        // Transfer Type and BIC validation
        String transfertypecode = transaction.getTransfertypes().getTransfertypecode();
        String receiverbic = transaction.getBank2().getBic();
        jsonResult.put("transferIsValid", transferIsValid(transfertypecode, receiverbic));

        // Check balance sufficieny
        Optional<Customer> customer = customerRepository.findById(transaction.getCustomer().getCustomerid());
        double senderbalance = customer.get().getClearbalance();
        double tranasactionamount = transaction.getCurrencyamount();
        double transferfees = transaction.getTransferfees();
        double conversionrate = transaction.getCurrency().getConversionrate();
        jsonResult.put("isAmountSufficient", isAmountSufficient(senderbalance, tranasactionamount, transferfees, conversionrate));

        // Check overdraft availability
        int overdraftavailability = customer.get().getOverdraftflag();
        jsonResult.put("overdraftAvailability", overdraftavailability == 1);

        // Validate transaction
        if((Boolean) jsonResult.get("presentInSDNList")) {
            jsonResult.put("transactionIsValid", false);
        }
        else {
            if(!(Boolean) jsonResult.get("transferIsValid")) {
                jsonResult.put("transactionIsValid", false);
            }
            else {
                if(!(Boolean) jsonResult.get("isAmountSufficient")) {
                    if(!(Boolean) jsonResult.get("overdraftAvailability")) {
                        jsonResult.put("transactionIsValid", false);
                    }
                    else {
                        customer.get().setClearbalance(0);
                        customerRepository.save(customer.get());
                        jsonResult.put("transactionIsValid", true);
                    }
                }
                else {
                    customer.get().setClearbalance(senderbalance - tranasactionamount*conversionrate - transferfees*conversionrate);
                    customerRepository.save(customer.get());
                    jsonResult.put("transactionIsValid", true);
                }
            }
        }
        jsonResult.put("Message", transaction.getMessage().getInstruction());
        jsonResult.put("Updated balance", customer.get().getClearbalance());

        jsonResult.put("Sender name", customer.get().getAccountholdername());
        jsonResult.put("Receiver name", transaction.getReceiveraccountholdername());
        jsonResult.put("Receiver AC", transaction.getReceiveraccountholdernumber());
        jsonResult.put("Receiver BIC", transaction.getBank2().getBic());
        jsonResult.put("Receiver bank name", transaction.getBank2().getBankname());

        return jsonResult;
    }

    public JSONObject saveTransaction(Transaction transaction) {
        JSONObject res = formValidation(transaction);

        if ((Boolean) res.get("transactionIsValid")) {
            transactionRepository.save(transaction);
        }
        return res;
    }

    public List<Transaction> getAll() {
        return transactionRepository.findAll();
    }
}


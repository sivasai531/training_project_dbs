package com.dbs.spring.backend.service;

import com.dbs.spring.backend.model.*;
import com.dbs.spring.backend.repository.CustomerRepository;
import com.dbs.spring.backend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public boolean isAmountSufficient(double senderbalance, double tranasactionamount, double transferfees) {
        if((transferfees + tranasactionamount) <= senderbalance) {
            return true;
        }
        return false;
    }

    public String checkTransfer(String transfertypecode, String receiverbic) {
        if(transfertypecode == "Customer Transfer") {
            if(receiverbic.substring(0, 4) == "HDFC") {
                return "Wrong Transfer Type";
            }
            else {
                return "Right";
            }
        }
        else if(transfertypecode == "Bank Transfer") {
            if(receiverbic.substring(0, 4) == "HDFC") {
                return "Right";
            }
            else {
                return "Wrong Transfer Type";
            }
        }
        return "Right";
    }

    public String checkSDNList() {

    }

    public boolean formIsValid(Transaction transaction) {

        List<String> result = new ArrayList<>();

        Optional<Customer> customer = customerRepository.findById(transaction.getCustomer().getCustomerid());
        System.out.println(customer.get().getClearbalance());
        double senderbalance = customer.get().getClearbalance();
        double tranasactionamount = transaction.getCurrencyamount();
        double transferfees = transaction.getTransferfees();

        System.out.println(senderbalance + " " + tranasactionamount + " " + transferfees);

        String transfertypecode = transaction.getTransfertypes().getTransfertypecode();
        String receiverbic = transaction.getBank2().getBic();

        String transferValidation = checkTransfer(transfertypecode, receiverbic);

        result.add(transferValidation);


        if(isAmountSufficient(senderbalance, tranasactionamount, transferfees)) {
            customer.get().setClearbalance(senderbalance - tranasactionamount - transferfees);
            customerRepository.save(customer.get());

            return true;
        }
        else {
            int overdraftavailability = customer.get().getOverdraftflag();
            System.out.println("Overdraft: " + overdraftavailability);
            if(overdraftavailability == 1) {
                return true;
            }
            else {
                return false;
            }
        }
    }

    public List<String> saveTransaction(Transaction transaction) {
        if(formIsValid(transaction)) {
            System.out.println("Accepted");
            transactionRepository.save(transaction);
        }
        else {
            System.out.println("Rejected");
        }
        List<String> l = new ArrayList<>();
        l.add();
        return l;
    }
}


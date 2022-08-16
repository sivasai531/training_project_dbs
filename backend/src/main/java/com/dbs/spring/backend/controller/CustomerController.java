package com.dbs.spring.backend.controller;

import com.dbs.spring.backend.model.Customer;
import com.dbs.spring.backend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/customer")
@CrossOrigin
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @PostMapping("/add")
    public String addCustomer(@RequestBody Customer customer) {
        customerService.saveCustomer(customer);
        return "New Customer added";
    }

    @GetMapping("/all")
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @GetMapping("/{id}")
    public Optional<Customer> findCustomerById(@PathVariable String id) {
        return customerService.getCustomerById(id);
    }
}

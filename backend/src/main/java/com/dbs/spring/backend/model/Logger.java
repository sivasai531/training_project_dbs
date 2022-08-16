package com.dbs.spring.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Logger {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int loggerid;
    // private String customerid;
    // private  int userid;
    // private int employeeid;
    private String screename;
    private String action;
    private String ipaddress;

    @ManyToOne(targetEntity = Customer.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "customerid")
    private Customer customer;

    @ManyToOne(targetEntity = CustomerUser.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "userid")
    private CustomerUser customeruser;

    @ManyToOne(targetEntity = Employee.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "employeeid")
    private Employee employee;

}

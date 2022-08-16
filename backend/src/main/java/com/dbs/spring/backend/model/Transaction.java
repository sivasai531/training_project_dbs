package com.dbs.spring.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int transactionid;

    private String receiveraccountholdernumber;
    private String receiveraccountholdername;
    private double currencyamount;
    private double transferfees;
    private double inamount;
    private Date transferdate;

    @ManyToOne
    @JoinColumn(name = "senderbic")
    private Bank bank1;

    @ManyToOne
    @JoinColumn(name = "receiverbic")
    private Bank bank2;

    @ManyToOne
    @JoinColumn(name = "messagecode")
    private Message message;

    @ManyToOne
    @JoinColumn(name = "customerid")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "currencycode")
    private Currency currency;

    @ManyToOne
    @JoinColumn(name = "transfertypecode")
    private TransferTypes transfertypes;

}

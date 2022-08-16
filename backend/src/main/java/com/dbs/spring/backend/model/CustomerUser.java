package com.dbs.spring.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "customeruser")
public class CustomerUser {
    @Id
    private int userid;
    private String username;
    // private String customerid;
    private String userpassword;

    @ManyToOne(targetEntity = Customer.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "customerid")
    private Customer customer;
}

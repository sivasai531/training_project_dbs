package com.dbs.spring.backend.model;

import lombok.*;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
@Setter
public class Customer {
    @Id
    private String customerid;
    private String accountholdername;
    private int overdraftflag;
    private double clearbalance;
    private String customeraddress;
    private String customercity;
    private String customertype;

}

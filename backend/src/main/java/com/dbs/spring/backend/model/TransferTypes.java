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
@Table(name = "transfertypes")
public class TransferTypes {
    @Id
    private String transfertypecode;
    private String transfertypedescription;


}

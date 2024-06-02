package com.angellos.payment.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "sender")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PSender {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String paymentCode;

    private String name;

    private String country;

    private String phone;

    private String address;

    private String dob;

    private String email;

    private String idNumber;

    private String idType;

    private String businessId;

    private String businessName;

    private ZonedDateTime createdAt = ZonedDateTime.now();

    @PrePersist
    public void prePersist(){
        this.createdAt = ZonedDateTime.now();
    }


}

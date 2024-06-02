package com.angellos.payment.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "destination")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PDestination {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String paymentCode;

    private String accountNumber;


    private String accountType;


    private String networkId;

    private String accountBank;

    private String networkName;

    private String country;

    private String accountName;

    private String phoneNumber;

    @CreationTimestamp
    private ZonedDateTime createdAt = ZonedDateTime.now();



}

package com.angellos.payment.entity;

import com.angellos.payment.dto.PRDestinationDTO;
import com.angellos.payment.dto.PRSenderDTO;
import com.angellos.payment.enums.CustomerType;
import com.angellos.payment.enums.PaymentStatus;
import com.angellos.payment.enums.TransactionType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.ZonedDateTime;
import java.util.UUID;

import static java.time.format.DateTimeFormatter.ISO_LOCAL_DATE_TIME;

@Entity
@Table(name = "payment")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String paymentCode;

    private String channelId;

    private String sequenceId;

    private String name;

    private String recipientName;

    private String amount;

    private String reason;

    private UUID senderId;

    private UUID destinationId;

    private CustomerType customerType;

    private PaymentStatus paymentStatus;

    private TransactionType transactionType;

    private Boolean forceAccept = false;

    @CreationTimestamp
    private ZonedDateTime createdAt = ZonedDateTime.now();

    @UpdateTimestamp
    private ZonedDateTime updatedAt = ZonedDateTime.now();



    @PrePersist
    public void prePersist(){
        this.updatedAt = ZonedDateTime.now();
    }


    public String getCreatedAtString(){
        return this.createdAt.format(ISO_LOCAL_DATE_TIME).replace("T", " ");
    }

}

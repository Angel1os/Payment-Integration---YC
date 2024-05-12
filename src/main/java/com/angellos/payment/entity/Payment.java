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
@Table(name = "payment")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String channelId;

    private String sequenceId;

    private String amount;

    private Boolean forceAccept = false;

    @CreationTimestamp
    private ZonedDateTime createdAt = ZonedDateTime.now();

}

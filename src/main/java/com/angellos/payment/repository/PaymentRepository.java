package com.angellos.payment.repository;

import com.angellos.payment.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PaymentRepository extends JpaRepository<Payment, UUID> {

}

package com.angellos.payment.service;

import com.angellos.payment.dto.ResponseRecord;
import org.springframework.http.ResponseEntity;

import java.util.UUID;

public interface PaymentService {

    ResponseEntity<ResponseRecord> getChannels();

}

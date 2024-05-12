package com.angellos.payment.service;

import com.angellos.payment.dto.PRDestinationDTO;
import com.angellos.payment.dto.PaymentRequestDTO;
import com.angellos.payment.dto.ResponseRecord;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface PaymentService {

    ResponseEntity<ResponseRecord> findChannels(String country);

    ResponseEntity<ResponseRecord> findNetworks(String activeChannel);

    ResponseEntity<ResponseRecord> validateAccount(Map<String, String> params, PRDestinationDTO prDestinationDTO);

    ResponseEntity<ResponseRecord> submitPaymentRequest(PaymentRequestDTO paymentRequestDTO);

    ResponseEntity<ResponseRecord> approvePaymentRequest(Boolean accept);
}

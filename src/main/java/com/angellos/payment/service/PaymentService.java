package com.angellos.payment.service;

import com.angellos.payment.dto.PRDestinationDTO;
import com.angellos.payment.dto.PaymentRequestDTO;
import com.angellos.payment.dto.ResponseRecord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;

import java.util.Map;

public interface PaymentService {

    ResponseEntity<ResponseRecord> getCountries();
    ResponseEntity<ResponseRecord> findChannels(String country);

    ResponseEntity<ResponseRecord> findNetworks(String activeChannel);

    ResponseEntity<ResponseRecord> validateAccount(PRDestinationDTO prDestinationDTO);

    ResponseEntity<ResponseRecord> submitPaymentRequest(PaymentRequestDTO paymentRequestDTO);

    ResponseEntity<ResponseRecord> filterTransactions(Map<String, String> params);

    Page filterTransactionsForUI(Pageable pageable, String search);

    ResponseEntity<ResponseRecord> approvePaymentRequest(String sequenceId, Boolean accept);

    ResponseEntity<ResponseRecord> acceptCollectionRequest(String sequenceId,Boolean approve);
}

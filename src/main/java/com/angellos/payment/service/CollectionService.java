package com.angellos.payment.service;

import com.angellos.payment.dto.CollectionRequestDTO;
import com.angellos.payment.dto.PaymentRequestDTO;
import com.angellos.payment.dto.ResponseRecord;
import org.springframework.http.ResponseEntity;

public interface CollectionService {


    ResponseEntity<ResponseRecord> submitCollectionRequest(CollectionRequestDTO collectionRequestDTO);


}

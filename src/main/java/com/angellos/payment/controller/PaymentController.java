package com.angellos.payment.controller;

import com.angellos.payment.dto.ResponseRecord;
import com.angellos.payment.service.PaymentService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * This class focuses on holding all the endpoints for initiating payments.
 * That is it accepts a list of payment details and then interface with Yellow Card
 * Payment endpoints to save the payments.
 * It then saves records in two database tables namely;
 * payment & payment_detail
 *
 * @author  Prince Ah
 * @createdAt 9th May 2024
 * @modifiedBy
 * @modifiedAt
 * @modified
 */

@RestController
@AllArgsConstructor
@RequestMapping("/api/vi/spi")
@Slf4j
public class PaymentController {

    PaymentService paymentService;

    @GetMapping("/channnels")
    ResponseRecord getChannels(){
        return paymentService.getChannels().getBody();
    }
}

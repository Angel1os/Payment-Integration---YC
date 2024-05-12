package com.angellos.payment.controller;

import com.angellos.payment.dto.PRDestinationDTO;
import com.angellos.payment.dto.PaymentRequestDTO;
import com.angellos.payment.dto.ResponseRecord;
import com.angellos.payment.service.PaymentService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * This class focuses on holding all the endpoints for initiating payments.
 * That is it accepts a list of payment details and then interface with Yellow Card
 *
 * @author  Prince Ah
 * @createdAt 9th May 2024
 */

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/yc/payments")
@Slf4j
@CrossOrigin
public class PaymentController {

    PaymentService paymentService;

    /**
     * Final endpoint
     */
    @PostMapping("/submit")
    ResponseRecord submitPayment(@RequestBody @Valid PaymentRequestDTO paymentRequestDTO){
        return paymentService.submitPaymentRequest(paymentRequestDTO).getBody();
    }

    /**
     * Steps to make a payment request
     */

    /**
     * This gives us active channels supported by the country
     * @param country
     * @return
     */
    @GetMapping("/channels")
    ResponseRecord getChannels(@RequestParam (defaultValue = "") String country) {
        return paymentService.findChannels(country).getBody();
    }

    /**
     * This gives us networks supported by the selected channel
     * @param channelId
     * @return
     */
    @GetMapping("/networks")
    ResponseRecord getNetworks(@RequestParam (defaultValue = "") String channelId) {
        return paymentService.findNetworks(channelId).getBody();
    }


    /**
     * This gives validates recipient account before submitting request
     * @param params
     * @return
     */
    @PostMapping("/validate-account")
    ResponseRecord validateRecipientAccount(@RequestParam Map<String,String> params, @RequestBody PRDestinationDTO prDestinationDTO){
        return paymentService.validateAccount(params,prDestinationDTO).getBody();
    }

    /**
     * This approves or deny payment after submitting request
     * @param
     * @return
     */
    @PostMapping("/submit-approval")
    ResponseRecord submitPaymentForApproval(@RequestBody @Valid PaymentRequestDTO paymentRequestDTO){
        return paymentService.submitPaymentRequest(paymentRequestDTO).getBody();
    }

    /**
     * This approves or deny payment after submitting request
     * @param accept
     * @return
     */
    @PostMapping("/approve")
    ResponseRecord approvePaymentRequest(@RequestParam(defaultValue = "false") Boolean accept){
        return paymentService.approvePaymentRequest(accept).getBody();
    }


}

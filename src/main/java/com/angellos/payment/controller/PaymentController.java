package com.angellos.payment.controller;

import com.angellos.payment.dto.PRDestinationDTO;
import com.angellos.payment.dto.PaymentRequestDTO;
import com.angellos.payment.dto.ResponseRecord;
import com.angellos.payment.enums.CustomerType;
import com.angellos.payment.service.PaymentService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * This class focuses on holding all the endpoints for initiating payments.
 * That is it accepts payment details and then interface with Yellow Card
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
     * This gives us active channels supported by the country
     * @return
     */
    @GetMapping("/countries")
    ResponseRecord getCountries () {
        return paymentService.getCountries().getBody();
    }

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
     * This gives various customer types
     * @return
     */
    @GetMapping("/customer-types")
    List getCustomerTypes() {
        paymentService.deleteAllNullData();
        return Arrays.stream(CustomerType.values()).toList();
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
     * @param prDestinationDTO
     * @return
     */
    @PostMapping("/validate")
    ResponseRecord validateRecipientAccount(@RequestBody PRDestinationDTO prDestinationDTO){
        return paymentService.validateAccount(prDestinationDTO).getBody();
    }

    /**
     * This submits payment for approval
     * @param
     * @return
     */
    @PostMapping("/submit")
    ResponseRecord submitPaymentRequest(@RequestBody @Valid PaymentRequestDTO paymentRequestDTO){
        return paymentService.submitPaymentRequest(paymentRequestDTO).getBody();
    }

    /**
     * This retrieves transactions from local db for approval
     * @param
     * @return
     */
    @GetMapping("/transactions")
    ResponseRecord findTransactions(@RequestParam Map<String,String> params){
        return paymentService.filterTransactions(params).getBody();
    }


    /**
     * This approves or deny payment after submitting request
     * @param approve
     * @return
     */
    @PostMapping("/{sequenceId}/approve")
    ResponseRecord approvePaymentRequest(@PathVariable(value = "sequenceId") String sequenceId,
                                         @RequestParam(defaultValue = "true") Boolean approve){
        return paymentService.approvePaymentRequest(sequenceId, approve).getBody();
    }

    /**
     * This initiates a withdrawal request
     * @param sequenceId
     * @return
     */
    @PostMapping("/{sequenceId}/collection")
    ResponseRecord acceptCollectionRequest(@PathVariable(value = "sequenceId") String sequenceId,
                                           @RequestParam(defaultValue = "true") Boolean approve){
        return paymentService.acceptCollectionRequest(sequenceId,approve).getBody();
    }


}

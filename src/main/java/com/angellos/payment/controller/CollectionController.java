package com.angellos.payment.controller;

import com.angellos.payment.dto.CollectionRequestDTO;
import com.angellos.payment.dto.PRDestinationDTO;
import com.angellos.payment.dto.PaymentRequestDTO;
import com.angellos.payment.dto.ResponseRecord;
import com.angellos.payment.service.CollectionService;
import com.angellos.payment.service.PaymentService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * This class focuses on holding all the endpoints for initiating collections.
 * That is it accepts collection details and then interface with Yellow Card
 *
 * @author  Prince Ah
 * @createdAt 9th May 2024
 */

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/yc/collections")
@Slf4j
@CrossOrigin
public class CollectionController {

    private final CollectionService collectionService;

    private final PaymentService paymentService;

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

    @PostMapping("/submit")
    ResponseRecord submitCollectionRequest(@RequestBody @Valid CollectionRequestDTO collectionRequestDTO){
        return collectionService.submitCollectionRequest(collectionRequestDTO).getBody();
    }

    /**
     * This initiates a withdrawal request
     * @param sequenceId
     * @return
     */
    @PostMapping("/{sequenceId}")
    ResponseRecord acceptCollectionRequest(@PathVariable(value = "sequenceId") String sequenceId,
                                           @RequestParam(defaultValue = "true") Boolean approve){
        return collectionService.acceptCollectionRequest(sequenceId,approve).getBody();
    }

}

package com.angellos.payment.serviceImpl;

import com.angellos.payment.config.YellowCardProperties;
import com.angellos.payment.dto.CollectionRequestDTO;
import com.angellos.payment.dto.ResponseRecord;
import com.angellos.payment.enums.CustomerType;
import com.angellos.payment.external.YellowCardService;
import com.angellos.payment.repository.PaymentRepository;
import com.angellos.payment.service.CollectionService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.angellos.payment.utility.AppUtils.*;
import static com.angellos.payment.utility.AppUtils.isNotNullOrEmpty;

@Service
@Slf4j
@AllArgsConstructor
public class CollectionServiceImpl implements CollectionService {

    private final PaymentRepository paymentRepository;

    private final YellowCardService yellowCardService;

    @Override
    public ResponseEntity<ResponseRecord> acceptCollectionRequest(String sequenceId, Boolean approve) {
        ResponseRecord response;
        try {
            log.info("Withdrawal initiation stage request by sequenceId-> {}", sequenceId);
            Map<String,String> payment = (Map<String, String>) yellowCardService.lookUpPaymentBySequenceId(sequenceId).data();
            String paymentId = payment.containsKey("id") ? payment.getOrDefault("paymentId","") : null;

            if (approve) {
                var res = yellowCardService.acceptCollectionRequest(paymentId).data();
                response = getResponseDto("Success",HttpStatus.OK,res);
            } else {
                var res = yellowCardService.denyCollectionRequest(paymentId).data();
                response = getResponseDto("Success",HttpStatus.OK,res);
            }


        }  catch (ResponseStatusException e) {
            log.error(e.getReason());
            response = getResponseDto(e.getReason(), HttpStatus.valueOf(e.getStatusCode().value()));
        } catch (Exception e) {
            e.printStackTrace();
            response = getResponseDto("Error occurred while submitting payment request ", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return response.toResponseEntity();
    }


    @Override
    public ResponseEntity<ResponseRecord> submitCollectionRequest(CollectionRequestDTO collectionRequestDTO) {
        ResponseRecord response;
        try {
            log.info("Building payload for submitting payment request -> {}",collectionRequestDTO);
            validateCollectionPayload(collectionRequestDTO);
            var res = yellowCardService.submitCollectionRequest(collectionRequestDTO);
            response = getResponseDto("Success",HttpStatus.OK,res);

        } catch (ResponseStatusException e) {
            log.error(e.getReason());
            response = getResponseDto(e.getReason(), HttpStatus.valueOf(e.getStatusCode().value()));
        } catch (Exception e) {
            e.printStackTrace();
            response = getResponseDto("Error occurred while submitting payment request ", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return response.toResponseEntity();
    }


    private void validateCollectionPayload(CollectionRequestDTO collectionRequestDTO) {
        log.info("Validating collection payload");
        /**
         * Validating by business logic
         */
        try {

//            if (!isValidDateFormat(collectionRequestDTO.getRecipient().getDob())) {
//                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Date of birth pattern is wrongly formatted");
//            }

            if (isNotNullOrEmpty(collectionRequestDTO.getAmount()) && isNotNullOrEmpty(collectionRequestDTO.getLocalAmount())) {
                collectionRequestDTO.setAmount(null);

            } else if (!isNotNullOrEmpty(collectionRequestDTO.getAmount()) && !isNotNullOrEmpty(collectionRequestDTO.getLocalAmount())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Both USD and local amounts cannot be null");
            }

            if (collectionRequestDTO.getCustomerType().equals(CustomerType.retail)) {
                if (!isNotNullOrEmpty(collectionRequestDTO.getRecipient().getName()) ||
                        !isNotNullOrEmpty(collectionRequestDTO.getRecipient().getCountry()) ||
                        !isNotNullOrEmpty(collectionRequestDTO.getRecipient().getPhone()) ||
                        !isNotNullOrEmpty(collectionRequestDTO.getRecipient().getAddress()) ||
                        !isNotNullOrEmpty(collectionRequestDTO.getRecipient().getDob()) ||
                        !isNotNullOrEmpty(collectionRequestDTO.getRecipient().getEmail()) ||
                        !isNotNullOrEmpty(collectionRequestDTO.getRecipient().getIdNumber()) ||
                        !isNotNullOrEmpty(collectionRequestDTO.getRecipient().getIdType())
                ) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Recipient information cannot be empty for retailer");
                }
            }

            if (collectionRequestDTO.getCustomerType().equals(CustomerType.institution)) {
                if (!isNotNullOrEmpty(collectionRequestDTO.getRecipient().getBusinessId()) ||
                        !isNotNullOrEmpty(collectionRequestDTO.getRecipient().getBusinessName())) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Recipient information cannot be empty for business owner");
                }
            }

            /**
             * Validating by api data
             */
            log.info("Filtering channels by status and params -> {}", collectionRequestDTO.getChannelId());
            Map<String, Object> channelResponse = (Map<String, Object>) yellowCardService.getChannels(collectionRequestDTO.getCountry()).data();
            List<Map<String, Object>> channels = (List<Map<String, Object>>) channelResponse.get("channels");
            List<Map<String, Object>> filteredChannels = channels.stream()
                    .filter(item -> {
                        boolean isActive = item.containsKey("status")
                                && item.getOrDefault("status", "inactive")
                                .toString().equalsIgnoreCase("active");
                        return isActive;
                    }).collect(Collectors.toList());

            if (((List<?>) filteredChannels).isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Channel is not active in the country");
            }

            log.info("Filtering network by selected channel id -> {}", collectionRequestDTO.getChannelId());
            Map<String, Object> networkResponse = (Map<String, Object>) yellowCardService.getNetworks().data();
            List<Map<String, Object>> networks = (List<Map<String, Object>>) networkResponse.get("networks");
            List<Map<String, Object>> filteredNetworks = networks.stream()
                    .filter(item -> {
                        return filterNetworks(String.valueOf(collectionRequestDTO.getChannelId()), item);
                    })
                    .collect(Collectors.toList());

            if (((List<?>) filteredNetworks).isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Network is not supported by the selected channel");
            }

        } catch (Exception e) {
            log.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }


    }

    private static boolean filterNetworks(String activeChannelId, Map<String, Object> item) {
        boolean isActive = item.containsKey("status")
                && item.getOrDefault("status", "inactive")
                .toString().equalsIgnoreCase("active")
                && item.containsKey("channelIds");

        if (isNotNullOrEmpty(activeChannelId)) {
            isActive = isActive && item.getOrDefault("channelIds", "")
                    .toString().contains(activeChannelId);
        }

        return isActive;
    }
}

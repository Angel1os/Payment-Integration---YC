package com.angellos.payment.serviceImpl;

import com.angellos.payment.config.YellowCardProperties;
import com.angellos.payment.dto.PRDestinationDTO;
import com.angellos.payment.dto.PaymentRequestDTO;
import com.angellos.payment.dto.ResponseRecord;
import com.angellos.payment.entity.Payment;
import com.angellos.payment.enums.CountriesCodes;
import com.angellos.payment.enums.CustomerType;
import com.angellos.payment.enums.PaymentStatus;
import com.angellos.payment.enums.TransactionType;
import com.angellos.payment.external.YellowCardService;
import com.angellos.payment.repository.PaymentRepository;
import com.angellos.payment.service.PaymentService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.angellos.payment.enums.CountriesCodes.getKeyValues;
import static com.angellos.payment.utility.AppUtils.*;

@Service
@Slf4j
@AllArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final YellowCardService yellowCardService;

    private final PaymentRepository paymentRepository;

    @Override
    public ResponseEntity<ResponseRecord> getCountries() {
        ResponseRecord response;
        try {
            var res = getKeyValues();
            response = getResponseDto("Success", HttpStatus.OK, res);
        } catch (ResponseStatusException e){
            log.error(e.getReason());
            response = getResponseDto(e.getReason(), HttpStatus.valueOf(e.getStatusCode().value()));
        } catch (Exception e){
            e.printStackTrace();
            response = getResponseDto("Error occurred while fetching channels ", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return response.toResponseEntity();
    }


    @Override
    public ResponseEntity<ResponseRecord> findChannels(String country) {
        ResponseRecord response;
        try {
            log.info("Querying channels by country -> {}",country);
            Map<String, Object> res = (Map<String, Object>) yellowCardService.getChannels(country).data();
            List<Map<String, Object>> channels = (List<Map<String, Object>>) res.get("channels");
            List<Map<String, Object>> filteredChannels = channels.stream()
                    .filter(item -> {
                        boolean isActive = item.containsKey("status")
                                && item.getOrDefault("status", "inactive")
                                .toString().equalsIgnoreCase("active");
                        return isActive;
                    }).collect(Collectors.toList());
            response = getResponseDto("Success", HttpStatus.OK, filteredChannels);

        } catch (ResponseStatusException e){
            log.error(e.getReason());
            response = getResponseDto(e.getReason(), HttpStatus.valueOf(e.getStatusCode().value()));
        } catch (Exception e){
            e.printStackTrace();
            response = getResponseDto("Error occurred while fetching channels ", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return response.toResponseEntity();
    }

    @Override
    public ResponseEntity<ResponseRecord> findNetworks(String activeChannelId) {
        ResponseRecord response;
        try {
            log.info("Filtering supported network by active channel id -> {}",activeChannelId);
            Map<String, Object> res = (Map<String, Object>) yellowCardService.getNetworks().data();
            List<Map<String, Object>> networks = (List<Map<String, Object>>) res.get("networks");
            if (isNotNullOrEmpty(activeChannelId)) {
                List<Map<String, Object>> filteredNetworks = networks.stream()
                        .filter(item -> {
                            return filterNetworks(activeChannelId, item);
                        })
                        .collect(Collectors.toList());
                response = getResponseDto("Success", HttpStatus.OK, filteredNetworks);
            } else {
                response = getResponseDto("Success", HttpStatus.OK, networks);
            }


        } catch (ResponseStatusException e){
            log.error(e.getReason());
            response = getResponseDto(e.getReason(), HttpStatus.valueOf(e.getStatusCode().value()));
        } catch (Exception e){
            e.printStackTrace();
            response = getResponseDto("Error occurred while fetching networks ", HttpStatus.INTERNAL_SERVER_ERROR);
        }
//        return response.toResponseEntity();
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.statusCode()));
    }

    @Override
    public ResponseEntity<ResponseRecord> validateAccount(PRDestinationDTO prDestinationDTO) {
        ResponseRecord response;
        try {
//            log.info("Validating recipient account before submitting payment request -> {}", );
            var res = yellowCardService.resolveBankAccount(prDestinationDTO).data();

            response = getResponseDto("Success!",HttpStatus.OK,res);

        } catch (ResponseStatusException e){
            log.error(e.getReason());
            response = getResponseDto(e.getReason(), HttpStatus.valueOf(e.getStatusCode().value()));
        } catch (Exception e){
            e.printStackTrace();
            response = getResponseDto("Error occurred while validating account", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return response.toResponseEntity();
    }


    @Override
    public ResponseEntity<ResponseRecord> submitPaymentRequest(PaymentRequestDTO paymentRequestDTO) {
        ResponseRecord response;
        try {
            log.info("Building payload for submitting payment request -> {}",paymentRequestDTO);

            validatePaymentPayload(paymentRequestDTO);
            var payment = Payment
                    .builder()
                    .channelId(paymentRequestDTO.getChannelId())
                    .sequenceId(String.valueOf(UUID.randomUUID()))
                    .name(paymentRequestDTO.getSender().getName())
                    .recipientName(paymentRequestDTO.getDestination().getAccountName())
                    .amount((paymentRequestDTO.getLocalAmount() != null && !paymentRequestDTO.getLocalAmount().isEmpty())
                            ? paymentRequestDTO.getLocalAmount() + " (Local)" : paymentRequestDTO.getAmount() + " (USD)")
                    .paymentStatus(PaymentStatus.Pending)
                    .transactionType(paymentRequestDTO.getTransactionType())
                    .forceAccept(paymentRequestDTO.getForceAccept())
                    .createdAt(ZonedDateTime.now())
                    .build();

            payment = paymentRepository.saveAndFlush(payment);
            log.info("Successfully saved to database");
            paymentRequestDTO.setSequenceId(payment.getSequenceId());
            Object res = null;
            try{
                res = yellowCardService.submitPaymentRequest(paymentRequestDTO).data();
            }catch (Exception e){
                payment.setPaymentStatus(PaymentStatus.Error);
                paymentRepository.save(payment);
                log.error(e.getMessage());
            }
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

    @Override
    public ResponseEntity<ResponseRecord> filterTransactions (Map<String, String> params) {
        ResponseRecord response;
        try {
            if (params == null || params.getOrDefault("paginate","false").equalsIgnoreCase("false")) {
                String searchValue = params != null ? params.getOrDefault("search","")
                        : "";

                var res = paymentRepository.findPaymentByNameContaining(searchValue);
                response = getResponseDto("Success!",HttpStatus.OK,res);
            } else {
                response = getResponseDto("Succhess",HttpStatus.OK);
            }

        } catch (ResponseStatusException e) {
            log.error(e.getReason());
            response = getResponseDto(e.getReason(), HttpStatus.valueOf(e.getStatusCode().value()));
        } catch (Exception e) {
            e.printStackTrace();
            response = getResponseDto("Error occurred while submitting payment request ", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return response.toResponseEntity();
    }

    @Override
    public Page filterTransactionsForUI(Pageable pageable, String search) {
        var res = paymentRepository.findAll();
        log.info("All : \n{}", res);
        return paymentRepository.findPagedPaymentByNameContaining(search,pageable);
    }

    @Override
    public ResponseEntity<ResponseRecord> approvePaymentRequest(String sequenceId, Boolean accept) {
        ResponseRecord response;
        try {
            log.info("Payment approval stage request -> {}", accept);
//            String paymentId = paymentRepository.findBySequenceId(sequenceId).getPaymentId();
            Map<String,String> payment = (Map<String, String>) yellowCardService.lookUpPaymentBySequenceId(sequenceId).data();
            String paymentId = payment.containsKey("id") ? payment.getOrDefault("paymentId","") : null;

            if (accept) {
                var res = yellowCardService.acceptPaymentRequest(paymentId).data();
                response = getResponseDto("Success",HttpStatus.OK,res);
            } else {
                var res = yellowCardService.denyPaymentRequest(paymentId).data();
                response = getResponseDto("Success",HttpStatus.OK,res);
            }
        } catch (ResponseStatusException e) {
            log.error(e.getReason());
            response = getResponseDto(e.getReason(), HttpStatus.valueOf(e.getStatusCode().value()));
        } catch (Exception e) {
            e.printStackTrace();
            response = getResponseDto("Error occurred while submitting payment request ", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return response.toResponseEntity();
    }

    @Override
    public ResponseEntity<ResponseRecord> acceptCollectionRequest(String sequenceId,Boolean approve) {
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



    public void validatePaymentPayload(PaymentRequestDTO paymentRequestDTO) {
        log.info("Validating payment payload");
        /**
         * Validating by business logic
         */
        try {

//            if (!isValidDateFormat(paymentRequestDTO.getSender().getDob())) {
//                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Date of birth pattern is wrongly formatted");
//            }

            if (isNotNullOrEmpty(paymentRequestDTO.getAmount()) && isNotNullOrEmpty(paymentRequestDTO.getLocalAmount())){
                paymentRequestDTO.setAmount(null);

            } else if (!isNotNullOrEmpty(paymentRequestDTO.getAmount()) && !isNotNullOrEmpty(paymentRequestDTO.getLocalAmount())){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Both USD and local amounts cannot be null");
            }

            if (paymentRequestDTO.getCustomerType().equals(CustomerType.retail)) {
                if (!isNotNullOrEmpty(paymentRequestDTO.getSender().getName()) ||
                        !isNotNullOrEmpty(paymentRequestDTO.getSender().getCountry()) ||
                        !isNotNullOrEmpty(paymentRequestDTO.getSender().getPhone()) ||
                        !isNotNullOrEmpty(paymentRequestDTO.getSender().getAddress()) ||
                        !isNotNullOrEmpty(paymentRequestDTO.getSender().getDob()) ||
                        !isNotNullOrEmpty(paymentRequestDTO.getSender().getEmail()) ||
                        !isNotNullOrEmpty(paymentRequestDTO.getSender().getIdNumber()) ||
                        !isNotNullOrEmpty(paymentRequestDTO.getSender().getIdType())
                ) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Sender information cannot be empty for retailer");
                }
            }

            if (paymentRequestDTO.getCustomerType().equals(CustomerType.institution)) {
                if (!isNotNullOrEmpty(paymentRequestDTO.getSender().getBusinessId()) ||
                        !isNotNullOrEmpty(paymentRequestDTO.getSender().getBusinessName())) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Sender information cannot be empty for business owner");
                }
            }

            /**
             * Validating by api data
             */
            log.info("Filtering channels by status and params -> {}",paymentRequestDTO.getChannelId());
            Map<String, Object> channelResponse = (Map<String, Object>) yellowCardService.getChannels(paymentRequestDTO.getCountry()).data();
            List<Map<String, Object>> channels = (List<Map<String, Object>>) channelResponse.get("channels");
            List<Map<String, Object>> filteredChannels = channels.stream()
                    .filter(item -> {
                        boolean isActive = item.containsKey("status")
                                && item.getOrDefault("status", "inactive")
                                .toString().equalsIgnoreCase("active");
                        return isActive;
                    }).collect(Collectors.toList());

            if (((List<?>) filteredChannels).isEmpty()) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Channel is not active in the country");
                }

                log.info("Filtering network by selected channel id -> {}",paymentRequestDTO.getChannelId());
                Map<String, Object> networkResponse = (Map<String, Object>) yellowCardService.getNetworks().data();
                List<Map<String, Object>> networks = (List<Map<String, Object>>) networkResponse.get("networks");
                List<Map<String, Object>> filteredNetworks = networks.stream()
                        .filter(item -> {
                            return filterNetworks(String.valueOf(paymentRequestDTO.getChannelId()), item);
                        })
                        .collect(Collectors.toList());

                if (((List<?>) filteredNetworks).isEmpty()) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Network is not supported by the selected channel");
                }

        } catch (Exception e){
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


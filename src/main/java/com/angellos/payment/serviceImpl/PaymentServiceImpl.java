package com.angellos.payment.serviceImpl;

import com.angellos.payment.config.YellowCardProperties;
import com.angellos.payment.dto.PRDestinationDTO;
import com.angellos.payment.dto.PaymentRequestDTO;
import com.angellos.payment.dto.ResponseRecord;
import com.angellos.payment.entity.Payment;
import com.angellos.payment.enums.CustomerType;
import com.angellos.payment.external.YellowCardService;
import com.angellos.payment.repository.PaymentRepository;
import com.angellos.payment.service.PaymentService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.angellos.payment.utility.AppUtils.getResponseDto;
import static com.angellos.payment.utility.AppUtils.isNotNullOrEmpty;

@Service
@Slf4j
@AllArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    YellowCardService yellowCardService;

    YellowCardProperties yellowCardProperties;

    private final PaymentRepository paymentRepository;

    RestTemplate restTemplate;
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


    @Override
    public ResponseEntity<ResponseRecord> validateAccount(Map<String, String> params, PRDestinationDTO prDestinationDTO) {
        ResponseRecord response;
        try {
            log.info("Validating recipient account before submitting payment request -> {}", params);
            var res = yellowCardService.resolveBankAccount(params,prDestinationDTO).data();

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

            validatePayment(paymentRequestDTO);
            var payment = Payment
                    .builder()
                    .channelId(paymentRequestDTO.getChannelId())
                    .sequenceId(String.valueOf(UUID.randomUUID()))
                    .amount(paymentRequestDTO.getLocalAmount())
                    .forceAccept(paymentRequestDTO.getForceAccept())
                    .build();

//            var paymentRecord = paymentRepository.save(payment);
//            paymentRequestDTO.setSequenceId(paymentRecord.getSequenceId());

            var res = yellowCardService.submitPaymentRequest(paymentRequestDTO).data();
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
    public ResponseEntity<ResponseRecord> approvePaymentRequest(Boolean accept) {
        ResponseRecord response;
        try {
            log.info("Payment request approval stage request -> {}", accept);
            String sequenceId = "";
            Map<String,String> payment = (Map<String, String>) yellowCardService.lookUpPaymentBySequenceId(sequenceId).data();
            String paymentId = payment.containsKey("id") ? payment.getOrDefault("paymentId","") : null;

            if (accept) {
                var res = yellowCardService.acceptPaymentRequest(paymentId).data();
                response = getResponseDto("Success",HttpStatus.OK,res);
            } else {
                var res = yellowCardService.denyPaymentRequest(paymentId).data();
                response = getResponseDto("Success",HttpStatus.OK,res);
            }
        }catch (ResponseStatusException e) {
            log.error(e.getReason());
            response = getResponseDto(e.getReason(), HttpStatus.valueOf(e.getStatusCode().value()));
        } catch (Exception e) {
            e.printStackTrace();
            response = getResponseDto("Error occurred while submitting payment request ", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return response.toResponseEntity();
    }


    public void validatePayment(PaymentRequestDTO paymentRequestDTO) {
        log.info("Validating payment payload");
        /**
         * Validating by business logic
         */
        try {
            if (!isNotNullOrEmpty(paymentRequestDTO.getAmount()) && !isNotNullOrEmpty(paymentRequestDTO.getLocalAmount())){
                paymentRequestDTO.setAmount(null);

            } else if (isNotNullOrEmpty(paymentRequestDTO.getAmount()) && isNotNullOrEmpty(paymentRequestDTO.getLocalAmount())){
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

            if (paymentRequestDTO.getCustomerType().equals(CustomerType.business)) {
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


}


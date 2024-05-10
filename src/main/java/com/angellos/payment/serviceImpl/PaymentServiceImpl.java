package com.angellos.payment.serviceImpl;

import com.angellos.payment.config.YellowCardProperties;
import com.angellos.payment.dto.ResponseRecord;
import com.angellos.payment.external.ExternalServiceUtil;
import com.angellos.payment.external.YellowCardService;
import com.angellos.payment.service.PaymentService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import static com.angellos.payment.utility.AppUtils.getResponseDto;

@Service
@Slf4j
@AllArgsConstructor
public class PaymentServiceImpl implements PaymentService {

//    private final ExternalServiceUtil externalServiceUtil;

    YellowCardService yellowCardService;


    YellowCardProperties yellowCardProperties;

    RestTemplate restTemplate;
    @Override
    public ResponseEntity<ResponseRecord> getChannels() {
        ResponseRecord response;
        try {
            response  = yellowCardService.getChannels();
            log.info("Hitting yellowcard");

//            response = getResponseDto("success", HttpStatus.OK);
        } catch (ResponseStatusException e){
            log.error(e.getReason());
            response = getResponseDto(e.getReason(), HttpStatus.valueOf(e.getStatusCode().value()));
        }catch (Exception e){
            e.printStackTrace();
            response = getResponseDto("Error occurred while updating the Payment ", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.statusCode()));
    }


//    return getResponseDto("Error confirming Payment", HttpStatus.INTERNAL_SERVER_ERROR)
//                    .toResponseEntity();
}

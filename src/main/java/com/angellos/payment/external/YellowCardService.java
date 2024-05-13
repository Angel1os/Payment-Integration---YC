package com.angellos.payment.external;

import com.angellos.payment.config.YellowCardProperties;
import com.angellos.payment.dto.CollectionRequestDTO;
import com.angellos.payment.dto.PRDestinationDTO;
import com.angellos.payment.dto.PaymentRequestDTO;
import com.angellos.payment.dto.ResponseRecord;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

import static com.angellos.payment.utility.AppUtils.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class YellowCardService {

    private final YellowCardProperties yellowCardProperties;

    private final ExternalServiceUtil externalServiceUtil;

    private final ObjectMapper objectMapper;

    /**
     * This method is used to fetch the channels from sandbox api
     * It returns the various channels details as a list
     * @return ResponseRecord
     */
    public ResponseRecord getChannels(String country) {
        /**
         * Compiling the Request Params
         */
        Map params = new HashMap<>();
        params.put("path", "/business/channels");
        if (isNotNullOrEmpty(country)) {
            params.put("country", country);
        }
        var response = yellowCardRequest(params, HttpMethod.GET,null);

        return getYellowCardResponse(response);
    }

    /**
     * This method is used to fetch the networks from sandbox api
     * It returns the various networks details as a list
     * @return ResponseRecord
     */
    public ResponseRecord getNetworks() {
        /**
         * Compiling the Request Params
         */
        Map params = new HashMap<>();
        params.put("path", "/business/networks");
        var response = yellowCardRequest(params, HttpMethod.GET,null);

        return getYellowCardResponse(response);
    }


    /**
     * This method is used to fetch the networks from sandbox api
     * It returns the various rates details as a list
     * @return ResponseRecord
     */
    public ResponseRecord getRates() {
        /**
         * Compiling the Request Params
         */
        Map params = new HashMap<>();
        params.put("path", "/business/rates");
        var response = yellowCardRequest(params, HttpMethod.GET,null);

        return getYellowCardResponse(response);
    }

    /**
     * This method is used to fetch account information from sandbox api
     * It returns the various account details as an object
     * @return ResponseRecord
     */
    public ResponseRecord getAccount() {
        /**
         * Compiling the Request Params
         */
        Map params = new HashMap<>();
        params.put("path", "/business/account");
        var response = yellowCardRequest(params, HttpMethod.GET,null);

        return getYellowCardResponse(response);
    }

    /**
     * This method is used to validate a bank account from sandbox api
     * It returns the account details for a user
     * @return ResponseRecord
     */
    public ResponseRecord resolveBankAccount(PRDestinationDTO prDestinationDTO) {
        /**
         * Compiling the Request Params
         */
        Map params = new HashMap<>();
        params.put("path", "/business/details/"+prDestinationDTO.getAccountType());

        var response = yellowCardRequest(params, HttpMethod.POST,prDestinationDTO);

        return getYellowCardResponse(response);
    }


    /**
     * This method is used to submit payment request to sandbox api
     * It returns...
     * @return ResponseRecord
     */
    public ResponseRecord submitPaymentRequest(PaymentRequestDTO paymentRequestDTO) {
        /**
         * Compiling the Request Params
         */
        Map params = new HashMap<>();
        params.put("path", "/business/payments");

        var response = yellowCardRequest(params, HttpMethod.POST,paymentRequestDTO);

        return getYellowCardResponse(response);
    }

    /**
     * This method is used to submit payment request from sandbox api
     * It returns
     * @return ResponseRecord
     */
    public ResponseRecord submitCollectionRequest(CollectionRequestDTO collectionRequestDTO) {
        /**
         * Compiling the Request Params
         */
        Map params = new HashMap<>();
        params.put("path", "/business/collections");

        var response = yellowCardRequest(params, HttpMethod.POST,collectionRequestDTO);

        return getYellowCardResponse(response);
    }

    /**
     * This method is used to accept payment request from sandbox api
     * It returns approval
     * @return ResponseRecord
     */
    public ResponseRecord approvePaymentRequest(String id) {
        /**
         * Compiling the Request Params
         */
        Map params = new HashMap<>();
        params.put("path", "/business/payments/{id}/accept");

        var response = yellowCardRequest(params, HttpMethod.POST,id);

        return getYellowCardResponse(response);
    }




    /**
     * This method is used to lookup specific payment request from sandbox api
     * It returns payment info
     * @return ResponseRecord
     */
    public ResponseRecord lookUpPayment(String id) {
        /**
         * Compiling the Request Params
         */
        Map params = new HashMap<>();
        params.put("path", "/business/payments/{id}");

        var response = yellowCardRequest(params, HttpMethod.GET,id);

        return getYellowCardResponse(response);
    }


    /**
     * This method is used to lookup specific payment request from sandbox api
     * It returns payment info
     * @return ResponseRecord
     */
    public ResponseRecord lookUpPaymentBySequenceId(String sequenceId) {
        /**
         * Compiling the Request Params
         */
        Map params = new HashMap<>();
        params.put("path", "/business/payments/sequence-id/{id}");

        var response = yellowCardRequest(params, HttpMethod.GET,sequenceId);

        return getYellowCardResponse(response);
    }

    public ResponseRecord acceptPaymentRequest(String paymentId) {
        /**
         * Compiling the Request Params
         */
        Map params = new HashMap<>();
        params.put("path", "/business/payments/" + paymentId + "/accept");

        var response = yellowCardRequest(params, HttpMethod.POST,null);

        return getYellowCardResponse(response);
    }

    /**
     * This method is used to deny payment request from sandbox api
     * It returns approval
     * @return ResponseRecord
     */
    public ResponseRecord denyPaymentRequest(String paymentId) {
        /**
         * Compiling the Request Params
         */
        Map params = new HashMap<>();
        params.put("path", "/business/payments/" + paymentId + "/deny");

        var response = yellowCardRequest(params, HttpMethod.POST,null);

        return getYellowCardResponse(response);
    }

    /**
     * This method is used to accept collection request from sandbox api
     * It executes withdrawal
     * @return ResponseRecord
     */
    public ResponseRecord acceptCollectionRequest(String paymentId) {
        /**
         * Compiling the Request Params
         */
        Map params = new HashMap<>();
        params.put("path", "/business/collections/" + paymentId + "/accept");

        var response = yellowCardRequest(params, HttpMethod.POST,null);

        return getYellowCardResponse(response);
    }

    public ResponseRecord denyCollectionRequest(String paymentId) {
        /**
         * Compiling the Request Params
         */
        Map params = new HashMap<>();
        params.put("path", "/business/collections/" + paymentId + "/deny");

        var response = yellowCardRequest(params, HttpMethod.POST,null);

        return getYellowCardResponse(response);
    }

    public Map yellowCardRequest(Map<String, Object> params, HttpMethod requestMethod, Object body){
        try{
            /**
             * Validating the Params variable for the request for Null or Empty values
             */
            if(!isNotNullOrEmpty(params) || params.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request Parameters cannot be null");
            }
            /**
             * Validating the Request Method for Null or Empty values
             */
            if(!isNotNullOrEmpty(requestMethod)){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request method cannot be null");
            }

            /**
             * Validating the URL from the Request Params
             */
            var url = params.getOrDefault("path", "");

            if(!isNotNullOrEmpty(url)){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Path cannot be null");
            }

            params.remove("path");

            /**
             * Mapping the params into a URL format, separated with &
             */
            var stringJoiner = getStringJoiner(params);

//            String path = url + ((stringJoiner == null || stringJoiner.length() == 0) ? "" : "&" + stringJoiner);
            String path = url + ((stringJoiner == null || stringJoiner.length() == 0) ? "" : "?" + stringJoiner);

            var response = externalServiceUtil
                    .makeRequestForMap(requestMethod, "Yellow Card Service", path, body,true);

            return response;
        } catch (ResponseStatusException e){
            log.error(e.getReason());
            var err = getResponseDto(e.getReason(), HttpStatus.valueOf(e.getStatusCode().value()), null);
            return objectMapper.convertValue(err, Map.class);
        } catch (Exception e){
            e.printStackTrace();
            var err = getResponseDto("Error occurred while fetching Invoice Details at Ghana.Gov Service ", HttpStatus.INTERNAL_SERVER_ERROR);
            return objectMapper.convertValue(err, Map.class);
        }
    }



}

package com.angellos.payment.external;

import com.angellos.payment.dto.ResponseRecord;
import com.angellos.payment.utility.YellowCardAuth;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.UnknownContentTypeException;
import org.springframework.web.server.ResponseStatusException;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.angellos.payment.utility.AppUtils.getResponseDto;
import static com.angellos.payment.utility.AppUtils.isNotNullOrEmpty;
import static java.security.KeyRep.Type.SECRET;

@Service
@AllArgsConstructor
@Slf4j
public class ExternalServiceUtil {

    private final RestTemplate restTemplate;

    private final ModelMapper modelMapper;

    private final ObjectMapper mapper;

    /**
     * This is a generic method to make  a request from the complaint service
     * @param type	This indicates the type of request (GET, POST ...)
     * @param serviceName	This is used mainly to throw a nice error message
     * @param path	This is the path for the request, the URI
     * @param body	This is a nullable request body
     * @return
     * @createdBy Prince Ah
     * @createdAt 9th May 2024
     * @modified
     * @modifiedBy
     * @modifiedAt
     */

//    private static final String API_KEY = "Yellow Card provided api key";
//    private static final String SECRET = "Yellow Card provided secret";
//
////    private static final Logger log = Logger.getLogger(ExternalServiceUtils.class.getName());
//
//    public ResponseRecord makeRequest(String type, String serviceName, String path, Object body, boolean generateSignature) {
//        log.info("inside makeRequest in ExternalServiceUtils");
//        ResponseRecord responseRecord;
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        ResponseEntity responseEntity = null;
//
//        /**
//         * Generating signature for the request
//         */
//        if (generateSignature) {
//            try {
//                String authorizationHeader = generateAuthorizationHeader(path, type, body);
//                headers.set(HttpHeaders.AUTHORIZATION, authorizationHeader);
//            } catch (NoSuchAlgorithmException | InvalidKeyException e) {
//                log.error("Error generating HMAC signature: " + e.getMessage());
//                // Handle the error appropriately
//                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Could access token cannot be empty");
////                return getResponseDto("Error occurred while updating invoice payment", HttpStatus.INTERNAL_SERVER_ERROR);
//            }
//        }
//
//        HttpEntity<Object> requestEntity = new HttpEntity<>(body, headers);
//        RestTemplate restTemplate = new RestTemplate();
//
//        try {
//            responseEntity = restTemplate.exchange(serviceName + path, HttpMethod.valueOf(type), requestEntity, String.class);
//            return new ResponseRecord(responseEntity.getStatusCode(), responseEntity.getBody(), responseEntity.getHeaders());
//        } catch (Exception e) {
//            log.error("Error making HTTP request: " + e.getMessage());
//            // Handle the error appropriately
//            return new ResponseRecord(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), null);
//        }
//    }

    private static final String API_KEY = "c5315180696a51ab885023bdc1ae3c0e";
    private static final String SECRET = "81473a4ca26a28203aa4a8e26afe571bf097ec5a2a5c2acd41c83a7968c4cf3b";
    private static final String TOKEN_PREFIX = "YcHmacV1";
    private static final String BASE_URL = "https://sandbox.api.yellowcard.io";

    private static ObjectMapper objectMapper = new ObjectMapper();

    private Map<String,Object> processRequestBody (Object body){
        Map<String, Object> processedBody = null;
        if (isNotNullOrEmpty(body)) {
            processedBody =  objectMapper.convertValue(body, Map.class);
        }
        return processedBody;
    }

    /*public ResponseRecord makeRequest(String type, String serviceName, String path, Object body, boolean generateSignature) {
        log.info("inside makeRequest in ExternalServiceUtils");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        if (generateSignature) {
            try {
                String authorizationHeader = generateAuthorizationHeader(path, type, body);
                headers.set(HttpHeaders.AUTHORIZATION, authorizationHeader);
            } catch (NoSuchAlgorithmException | InvalidKeyException e) {
                log.error("Error generating HMAC signature: " + e.getMessage());
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error generating HMAC signature", e);
            }
        }

        HttpEntity<Object> requestEntity = new HttpEntity<>(body, headers);
        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<String> responseEntity;
        try {
            responseEntity = restTemplate.exchange(serviceName + path, HttpMethod.valueOf(type), requestEntity, String.class);
            HttpStatusCode statusCode = responseEntity.getStatusCode();
            Object responseBody = responseEntity.getBody();
            ZonedDateTime dateTime = ZonedDateTime.now(); // Timestamp of the response

            return new ResponseRecord("Success", statusCode.value(), responseBody, dateTime);
        } catch (Exception e) {
            log.error("Error making HTTP request: " + e.getMessage());
            HttpStatus statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            String errorMessage = e.getMessage();
            return new ResponseRecord("Error", statusCode.value(), errorMessage, ZonedDateTime.now());
        }
    }*/

//    public Map makeRequestForMap(HttpMethod type, String serviceName, String path, Object body, Boolean generateSignature) {
    public Map makeRequestForMap(HttpMethod type, String serviceName, String path, Object body, Boolean generateSignature) {
        log.info("inside queryYellowCard in ExternalServiceUtils");
        URI uri = URI.create(BASE_URL + path);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON, MediaType.TEXT_HTML));
        ResponseEntity responseEntity = null;

        if (Boolean.TRUE.equals(generateSignature)) {
            //                String authorizationHeader = YellowCardAuth.yellowCardAuth(path, RequestMethod.valueOf(type.name()), body);
//                headers.set(HttpHeaders.AUTHORIZATION, authorizationHeader);
            headers = YellowCardAuth.yellowCardAuth(path, RequestMethod.valueOf(type.name()), processRequestBody(body));

        }

        HttpEntity requestBodyFormUrlEncoded = new HttpEntity<>(body, headers);

        /**
         * Fetching the Request Type from the String type
         */
        try {

            responseEntity = restTemplate.exchange(uri, type, requestBodyFormUrlEncoded, String.class);

            Map res = getResponseEntityBody(responseEntity);

            log.info("Request was successful");
            return res;
        } catch (HttpServerErrorException e) {
            var errRes = getResponseFromString(e.getResponseBodyAsString());
            throw new ResponseStatusException(e.getStatusCode(), errRes.message());
        } catch (HttpClientErrorException e) {
            var errRes = getResponseFromString(e.getResponseBodyAsString());
            throw new ResponseStatusException(e.getStatusCode(), errRes.message());
        } catch (UnknownContentTypeException e) {
            // Log the error for debugging purposes.
            log.error("Received an unexpected content type: " + e.getContentType());
            // Handle this specific error case.
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected response content type");
        }catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error occurred while making request to Yellow Card");
        }
    }


    public Map<String, Object> getResponseEntityBody(ResponseEntity responseEntity){
        try{
            HttpHeaders responseHeaders = responseEntity.getHeaders();
            MediaType contentType = responseHeaders.getContentType();

            if (MediaType.APPLICATION_JSON.isCompatibleWith(contentType)) {
                // Handle JSON response
                String jsonResponse = (String) responseEntity.getBody();
                // Convert jsonResponse to a Map
                Map<String, Object> map = new HashMap<>();
                map.put("status", responseEntity.getStatusCode().value());
                map.putAll(parseJsonResponse(jsonResponse));
                return map;
            } else if (MediaType.TEXT_HTML.isCompatibleWith(contentType)) {
                // Handle HTML response
                String htmlResponse = (String) responseEntity.getBody();
                Map<String, Object> map = new HashMap<>();
                map.put("status", responseEntity.getStatusCode().value());
                try{
                    ObjectMapper objectMapper = new ObjectMapper();
                    map.putAll(objectMapper.readValue(htmlResponse, Map.class));
                }catch (Exception e){
                    e.printStackTrace();
                }

                return map;
            } else {
                // Handle other content types as needed
                // For example, you can throw an exception for unsupported types
                throw new ResponseStatusException(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "Unsupported content type: " + contentType);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }


    private Map<String, Object> parseJsonResponse(String jsonResponse) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(jsonResponse, new TypeReference<Map<String, Object>>() {});
        } catch (IOException e) {
            throw new RuntimeException("Error parsing JSON response", e);
        }
    }


    /**
     * This method basically is used to build the responseDTO from a string value
     * This method is used to get the response from an error message, such as HttpClientException
     * @param data
     * @return
     * @author Ebenezer N.
     * @CreatedAt 26th July 2023
     * @Modified
     * @ModifiedAt
     */
    public ResponseRecord getResponseFromString(String data){
        log.info("inside getResponseFromString in ExternalServiceUtil");
        if(data == null){
            return null;
        }
        ResponseRecord responseDto = null;
        try {
            responseDto = mapper.readValue(data, ResponseRecord.class);
        } catch (JsonProcessingException e) {
            responseDto = getResponseDto(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseDto;
    }

/*    public static String generateAuthorizationHeader(String path, String method, Object body)
            throws NoSuchAlgorithmException, InvalidKeyException {

        String timestamp = ZonedDateTime.now().toString(); // Use current timestamp

        Mac hmacSha256 = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKey = new SecretKeySpec(SECRET.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        hmacSha256.init(secretKey);

        hmacSha256.update(timestamp.getBytes(StandardCharsets.UTF_8));
        hmacSha256.update(path.getBytes(StandardCharsets.UTF_8));
        hmacSha256.update(method.getBytes(StandardCharsets.UTF_8));

        if (body != null) {
            String requestBody = (body instanceof String) ? (String) body : body.toString();
            byte[] bodyHash = getSHA256Hash(requestBody);
            hmacSha256.update(bodyHash);
        }

        byte[] hmacResult = hmacSha256.doFinal();
        String signature = Base64.getEncoder().encodeToString(hmacResult);

//        return String.format("%s %s:%s", TOKEN_PREFIX, API_KEY, signature);
        return TOKEN_PREFIX + " " + API_KEY + ":"  + signature;

//        HttpEntity requestBodyFormUrlEncoded = new HttpEntity<>(body, headers);

    }

    private static byte[] getSHA256Hash(String input) throws NoSuchAlgorithmException {
        return java.security.MessageDigest.getInstance("SHA-256").digest(input.getBytes(StandardCharsets.UTF_8));
    }*/




}

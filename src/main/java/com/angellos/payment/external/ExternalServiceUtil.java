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

import java.io.IOException;
import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.angellos.payment.utility.AppUtils.getResponseDto;
import static com.angellos.payment.utility.AppUtils.isNotNullOrEmpty;
import static com.angellos.payment.utility.YellowCardAuth.generateAuthorizationHeaders;

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
    private static final String BASE_URL = "https://sandbox.api.yellowcard.io";

    private static ObjectMapper objectMapper = new ObjectMapper();

    private Map<String,Object> processRequestBody (Object body){
        Map<String, Object> processedBody = null;
        if (isNotNullOrEmpty(body)) {
            processedBody =  objectMapper.convertValue(body, Map.class);
        }
        return processedBody;
    }



    public Map makeRequestForMap(HttpMethod type, String serviceName, String path, Object body, Boolean generateSignature) {
        log.info("Making request to payment api -> {} with body -> {}",path,body);
        URI uri = URI.create(BASE_URL + path);

        HttpHeaders headers = new HttpHeaders();
        if (Boolean.TRUE.equals(generateSignature)) {
            headers.addAll(generateAuthorizationHeaders(
                    (path.contains("?") ? path.substring(0, path.indexOf("?")) : path),
                RequestMethod.valueOf(type.name()), processRequestBody(body)));
        }
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON, MediaType.TEXT_HTML));
        log.info("Headers -> {}",headers);

        ResponseEntity responseEntity = null;

        HttpEntity requestBodyFormUrlEncoded = new HttpEntity<>(body, headers);

        /**
         * Fetching the Request Type from the String type
         */
        try {

            responseEntity = restTemplate.exchange(uri, type, requestBodyFormUrlEncoded, String.class);

            Map res = getResponseEntityBody(responseEntity);
            log.info("Successfully made request");
            return res;
        } catch (HttpServerErrorException | HttpClientErrorException e) {
            var errRes = getResponseFromString(e.getResponseBodyAsString());
            throw new ResponseStatusException(e.getStatusCode(), errRes.message());
        } catch (UnknownContentTypeException e) {
            log.error("Received an unexpected content type: " + e.getContentType());
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
                String jsonResponse = (String) responseEntity.getBody();
                Map<String, Object> map = new HashMap<>();
                map.put("status", responseEntity.getStatusCode().value());
                map.putAll(parseJsonResponse(jsonResponse));
                return map;
            } else if (MediaType.TEXT_HTML.isCompatibleWith(contentType)) {
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
     * @return response record
     */
    public ResponseRecord getResponseFromString(String data){
        log.info("inside getResponseFromString in ExternalServiceUtil");
        if(data == null) {
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


}

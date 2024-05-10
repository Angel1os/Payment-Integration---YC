package com.angellos.payment.external;

import com.angellos.payment.config.YellowCardProperties;
import com.angellos.payment.dto.ResponseRecord;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
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
     * This method is used to fetch the channels from snadbox api
     * It returns the various channels details as a list
     * @return ResponseRecord
     * @createdAt 9th May 2024
     * @author Prince Ah
     */
    public ResponseRecord getChannels() {
        /**
         * Compiling the Request Params
         */
        Map params = new HashMap<>();
        params.put("path", "/business/channels");
        var response = yellowCardRequest(params, HttpMethod.GET,null);

        return getYellowCardResponse(response);
    }




    public Map yellowCardRequest(Map<String, Object> params, HttpMethod requestMethod, Object body){
        try{
            /**
             * Validating the Params variable for the request for Null or Empty values
             */
            if(!isNotNullOrEmpty(params) || params.isEmpty()){
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
            var url = params.getOrDefault("url", "");

            if(!isNotNullOrEmpty(url)){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request URL cannot be null");
            }

            params.remove("url");


            /**
             * Mapping the params into a URL format, separated with &
             */
            var stringJoiner = getStringJoiner(params);

            String path = yellowCardProperties.getBaseUrl() + url + "?api_key=" + yellowCardProperties.getApiKey() +
                    ((stringJoiner == null || stringJoiner.length() == 0) ? "" : "&" + stringJoiner);

            var response = externalServiceUtil
                    .makeRequestForMap(requestMethod, "channels", path, body,true);

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

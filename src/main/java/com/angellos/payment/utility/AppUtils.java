package com.angellos.payment.utility;

import com.angellos.payment.dto.ResponseRecord;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import java.time.ZonedDateTime;
import java.util.Collection;
import java.util.Map;
import java.util.StringJoiner;

public class AppUtils {
    public static ResponseRecord getResponseDto(String message, HttpStatus status){
        ResponseRecord responseRecord = new ResponseRecord(message, status.value(), null, ZonedDateTime.now());
        return responseRecord;

    }

    /**
     * This method basically is used to build a response object to be returned to the UI
     * This is the basic format for all responses in the application...
     * The method is overloaded and hence data can either be passed or not depending on whether there is data to be passed
     * For instance, if there is a NOT found response, there is obviously no data to be passed and hence not required.
     * @param message
     * @param status
     * @param data
     * @return
     * @author Samuel O.
     * @CreatedAt 12th July 2023
     * @Modified
     * @ModifiedAt
     */
    public static ResponseRecord getResponseDto(String message, HttpStatus status, Object data){
        ResponseRecord responseRecord = new ResponseRecord(message, status.value(), data, ZonedDateTime.now());
        return responseRecord;
    }

    public static boolean isNotNullOrEmpty(Object str){
        try {
            if(str == null){
                return false;
            }
            if(str instanceof Collection<?>){
                return !((Collection<?>) str).isEmpty();
            }
            return !str.toString().trim().equalsIgnoreCase("");
        }catch (Exception e){
            e.printStackTrace();
        }
        return false;
    }


    /**
     * This method is used to transform the Ghana.Gov response to ResponseRecord
     * @param response
     * @return  ResponseRecord
     * @author Ebenezer N.
     * @createdAt 28th Sep 2023
     * @modified
     * @modifiedBy
     * @modifiedAt
     */
    public static ResponseRecord getYellowCardResponse(Map response) {
        if(response == null || response.isEmpty()){
            return getResponseDto("Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }else{
            var paramStatus = response.getOrDefault("status", null);
            /**
             * get the HttpStatus for the status parameter in the params
             */
            var status = getYellowCardStatus(paramStatus);

            var message = response.getOrDefault("message", null);

            /**
             * Prune the params for the rest to be used as the responseRecord data
             */
            if(status != null){
                response.remove("status");
            }
            if(message != null){
                response.remove("message");
            }

            return getResponseDto((isNotNullOrEmpty(message) ? message.toString() : getYellowCardStatus(paramStatus, false).toString()),
                    (HttpStatus) status, response);
        }
    }

    public static Object getYellowCardStatus(Object status) {
        return getYellowCardStatus(status, true);
    }

    /**
     * This method is used to Translate the Ghana.Gov request Response to either HttpStatus or its corresponding meaning
     * @param status    String value from Ghana.Gov
     * @param isStatus  boolean to indicate if it should return HttpStatus or String
     * @return Object (either HttpStatus or String)
     * @author Ebenezer N.
     * @createdAt 28th Sep 2023
     * @modified
     * @modifiedBy
     * @modifiedAt
     */
    public static Object getYellowCardStatus(Object status, boolean isStatus) {
        try{
            if(isStatus){
                if(isNotNullOrEmpty(status)){
                    if(status instanceof Integer){
                        return switch ((Integer) status){
                            case 0 -> HttpStatus.OK;
//                            case 2 -> HttpStatus.UNAUTHORIZED;
                            case 3, -100, 1, 2 -> HttpStatus.BAD_REQUEST;
                            case 12 -> HttpStatus.CONTINUE;
                            default -> HttpStatus.valueOf((Integer) status);
                        };
                    }else if(status instanceof HttpStatus){
                        return status;
                    }else if(status instanceof HttpStatusCode) {
                        return HttpStatus.valueOf(((HttpStatusCode) status).value());
                    }
                }
            } else{
                if(isNotNullOrEmpty(status)){
                    if(status instanceof Integer) {
                        return switch ((Integer) status) {
                            case 0 -> "Success";
//                            case 2 -> "Invalid Credentials";
                            case 3, -100, 1, 2 -> "Invalid Request";
                            case 12 -> "Info / Warning responses";
                            default -> HttpStatus.valueOf((Integer) status).getReasonPhrase();
                        };
                    }
                    else if(status instanceof HttpStatus){
                        return ((HttpStatus) status).getReasonPhrase();
                    }else if(status instanceof HttpStatusCode) {
                        return HttpStatus.valueOf(((HttpStatusCode) status).value()).getReasonPhrase();
                    }
                }
            }

        }catch (Exception e){
            e.printStackTrace();
        }

        if(isStatus){
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }else{
            return "Error";
        }
    }


    /**
     * This is used to join string to be used a request param
     * @param params This is the multivaluemap that contains the parameters
     * @return StringJoiner
     * @author Ebenezer N.
     * @createdAt 3rd July, 2023
     */
    public static StringJoiner getStringJoiner(Map<String, Object> params) {
        StringJoiner sj = new StringJoiner("&");
        params.entrySet().stream().forEach(e -> {
            sj.add(e.getKey() + "=" + e.getValue());
        });
        return sj;
    }
}

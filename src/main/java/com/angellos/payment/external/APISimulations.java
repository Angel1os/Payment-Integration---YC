package com.angellos.payment.external;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * This class is to simulate sandbox api calls
 */
public class APISimulations {

    public static Map<String,Object> getChannels() {
        var channelsFromFile = parseSimulatedJson("channels.json");
        System.out.println(channelsFromFile);
        return channelsFromFile;

    }

    public static Map<String,Object> getNetworks() {
        var channelsFromFile = parseSimulatedJson("networks.json");
        System.out.println(channelsFromFile);
        return channelsFromFile;

    }


    private static Map<String,Object>  parseChannelsJson() {
        File file = new File("src/main/resources/channels.json");
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(file, new TypeReference<Map<String, Object>>() {});
        } catch (IOException e) {
            throw new RuntimeException("Error parsing JSON response",e);
        }
    }

    private static Map<String,Object>  parseNetworksJson() {
        File file = new File("src/main/resources/networks.json");
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(file, new TypeReference<Map<String, Object>>() {});
        } catch (IOException e) {
            throw new RuntimeException("Error parsing JSON response",e);
        }
    }

    private static Map<String,Object>  parseSimulatedJson(String jsonFile) {
        File file = new File("src/main/resources/"+jsonFile);
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(file, new TypeReference<Map<String, Object>>() {});
        } catch (IOException e) {
            throw new RuntimeException("Error parsing JSON response",e);
        }
    }


    public static Map<String,String> submitPaymentRequest() {
        Map<String,String> paymentCreatedStatus = new HashMap<>();
        paymentCreatedStatus.put("status","CREATED");
        return paymentCreatedStatus;
    }
}

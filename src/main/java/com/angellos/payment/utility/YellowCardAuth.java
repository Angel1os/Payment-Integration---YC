package com.angellos.payment.utility;

import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import java.util.Map;
import java.util.TreeMap;

public class YellowCardAuth {

    private static final String API_KEY = "c5315180696a51ab885023bdc1ae3c0e";

    private static final String API_SECRET = "81473a4ca26a28203aa4a8e26afe571bf097ec5a2a5c2acd41c83a7968c4cf3b";



    public static HttpHeaders yellowCardAuth(String path, RequestMethod method, Map<String, Object> body){
        return yellowCardAuth(API_KEY, API_SECRET, path, method, body);
    }

    public static HttpHeaders yellowCardAuth(String apiKey, String apiSecret,
                                             String path, RequestMethod method, Map<String, Object> body) {
        // Get the current timestamp in ISO format
        String date = Instant.now().toString();

        // Create a sorted map to hold the request parameters
        TreeMap<String, String> params = new TreeMap<>();
        params.put("X-YC-Timestamp", date);

        // Update the HMAC with the timestamp, path, and method
        String requestString = date + path + method.name();
        if (body != null && !body.isEmpty()) {
            // Add body parameters if present
            params.put("body", body.toString());
            requestString += body.toString();
        }

        // Calculate the HMAC signature
        String signature = calculateHmacSHA256(apiSecret, requestString);

        // Add headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-YC-Timestamp", date);
        headers.set("Authorization", "YcHmacV1 " + apiKey + ":" + signature);
        return headers;
    }

    private static String calculateHmacSHA256(String key, String data) {
        try {
            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
            SecretKeySpec secret_key = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            sha256_HMAC.init(secret_key);
            byte[] hash = sha256_HMAC.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}

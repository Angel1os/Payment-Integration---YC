package com.angellos.payment.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties("yellow-card")
public class YellowCardProperties {

    private String uri;

    private int port;

    private String apiKey;

    private String secretKey;

    private String tokenPrefix;

    private String postUrl;

    private String baseUrl;

}

package com.angellos.payment;

import com.angellos.payment.config.YellowCardProperties;
import com.angellos.payment.external.ExternalServiceUtil;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.ZonedDateTime;

@SpringBootApplication
@EnableConfigurationProperties(value = {YellowCardProperties.class})
public class SpringPaymentIntegrationApplication {

    public static void main(String[] args) {

        SpringApplication.run(SpringPaymentIntegrationApplication.class, args);

        try {
            var auth = ExternalServiceUtil.generateAuthorizationHeader("/business/channels", "GET", null);
            System.out.println("Authorization : " + auth);
//            System.out.println("Date : " + ZonedDateTime.now());
            System.out.println("Date : " + ZonedDateTime.now());
        } catch (NoSuchAlgorithmException | InvalidKeyException  e) {
            System.err.println(e.getMessage());
        }
    }

    @Bean
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }

    @Bean
    public ModelMapper modelMapper () {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.STRICT);
        return mapper;
    }


}

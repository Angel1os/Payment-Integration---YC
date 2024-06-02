package com.angellos.payment;

import com.angellos.payment.config.YellowCardProperties;
import com.angellos.payment.utility.YellowCardAuth;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.RestTemplate;

import java.time.ZonedDateTime;

@SpringBootApplication
@EnableConfigurationProperties(value = {YellowCardProperties.class})
public class SpringPaymentIntegrationApplication {

    public static void main(String[] args) {

        SpringApplication.run(SpringPaymentIntegrationApplication.class, args);

            var auth = YellowCardAuth.generateAuthorizationHeaders("/business/channels", RequestMethod.valueOf(HttpMethod.GET.name()), null);
            System.out.println("Authorization : " + auth);
            System.out.println("Date : " + ZonedDateTime.now());

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

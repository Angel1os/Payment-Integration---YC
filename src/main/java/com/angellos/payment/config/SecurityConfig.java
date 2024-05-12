//package com.angellos.payment.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//
//import java.util.List;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
//        http
//                .csrf((csrf) -> csrf.disable())
//                .cors(Customizer.withDefaults())
//                .authorizeHttpRequests((auth) -> auth
//                        .requestMatchers( "/api/v1/**")
//                        .permitAll()
//                        .requestMatchers( "/api/v1/**")
//                        .permitAll()
//                        .anyRequest()
//                        .authenticated())
//                .sessionManagement((session) -> session
//                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//
//        return http.build();
//
//    }
//
//    @Bean
//    CorsConfigurationSource corsConfigurationSource() {
//        final CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedMethods(List.of("HEAD",
//                "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
//        configuration.applyPermitDefaultValues();
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
//
//    @Bean
//    public WebSecurityCustomizer webSecurityCustomizer(){
//        return (web) -> web.ignoring().requestMatchers("/api/v1/**");
//    }
//}

package com.authservice.config;


import io.jsonwebtoken.security.Keys;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;

import javax.crypto.SecretKey;

@Configuration
@ConfigurationProperties("jwt")
@NoArgsConstructor
@Data
public class JwtConfig {
    private String secretKey;
    private String tokenPrefix;
    private Integer tokenExpiresAfterDays;
    private Integer tokenExpiresAfterMinutes;

    public String getAuthorizationHeader() {
        return HttpHeaders.AUTHORIZATION;
    }


    @Bean
    public SecretKey jwtSecretKey() {
        return Keys.hmacShaKeyFor(this.getSecretKey().getBytes());
    }

}

package com.authservice.utils;

import com.authservice.config.JwtConfig;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class JwtUtils {
    private JwtConfig jwtConfig;
    private SecretKey secretKey;


    @Autowired
    JwtUtils(JwtConfig jwtConfig, SecretKey secretKey) {
        this.jwtConfig = jwtConfig;
        this.secretKey = secretKey;
    }

    public String extractToken(HttpServletRequest request) {
        String authorizationHeader = request.getHeader(jwtConfig.getAuthorizationHeader());
        if (Strings.isEmpty(authorizationHeader) || !authorizationHeader.startsWith(jwtConfig.getTokenPrefix()))
            return null;
        return authorizationHeader.replace(jwtConfig.getTokenPrefix(), "");
    }

    public String signToken(String subject, Collection<? extends GrantedAuthority> authorities) {
        return Jwts.builder()
                .setSubject(subject)
                .claim("authorities", authorities)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtConfig.getTokenExpiresAfterMinutes() * 60 * 1000))
                .signWith(secretKey)
                .compact();
    }


    public DecodedToken decodeToken(String token) {
        try {
            Jws<Claims> claimsJws = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
            Claims payload = claimsJws.getBody();
            String subject = payload.getSubject(); //The email
            List<Map<String, String>> claims = (List<Map<String, String>>) payload.get("authorities");
            Set<SimpleGrantedAuthority> authorities = claims.stream()
                    .map(m -> new SimpleGrantedAuthority(m.get("authority")))
                    .collect(Collectors.toSet());
            return new DecodedToken(subject, authorities);
        } catch (JwtException exception) {
            throw exception;
        }
    }

    public String signRefreshToken(String subject) {
        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtConfig.getTokenExpiresAfterDays() * 24 * 60 * 60 * 1000))
                .signWith(secretKey)
                .compact();
    }

    public String validateRefreshToken(String refreshToken) {
        try {
            Claims payload = Jwts.parserBuilder()
                    .setSigningKey(secretKey).build()
                    .parseClaimsJws(refreshToken)
                    .getBody();
             return payload.getSubject();
        } catch (JwtException exception) {
            throw exception;
        }
    }

    public void sendTokens(HttpServletResponse response, Map<String, String> tokens) {
        response.addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + tokens.get("access_token"));
        response.addHeader("refresh_token", tokens.get("refresh_token"));
        try {
            new ObjectMapper().writeValue(response.getOutputStream(), tokens);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


}

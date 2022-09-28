package com.authservice.security;


import com.authservice.utils.DecodedToken;
import com.authservice.utils.JwtUtils;
import io.jsonwebtoken.JwtException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;


import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class CutsomAuthorizationFilter extends OncePerRequestFilter {
    private final JwtUtils jwtUtils;
    public CutsomAuthorizationFilter(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String access_token = jwtUtils.extractToken(request);

        Set<String> WHITE_LIST = new HashSet<>();
        WHITE_LIST.add("/api/refresh_token"); WHITE_LIST.add("/api/register");
        WHITE_LIST.add("/refresh_token");WHITE_LIST.add("/register");

        if (access_token == null || WHITE_LIST.contains(request.getServletPath())) {
            filterChain.doFilter(request, response);
            return;
        }
        try {
//            Decode token
            DecodedToken decodedToken = jwtUtils.decodeToken(access_token);
//            Authenticate User if token is valid/ decodedToken.getSubject() => User Email
            Authentication authentication = new UsernamePasswordAuthenticationToken(decodedToken.getSubject(), null, decodedToken.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (JwtException exception) {
//            Revoke token if expired or not valid :'(
            System.out.println(exception.getMessage());
            throw new IllegalStateException(String.format("Token %s cannot be trusted", access_token));
        }
        filterChain.doFilter(request, response);
    }
}

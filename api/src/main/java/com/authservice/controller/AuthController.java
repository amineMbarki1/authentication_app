package com.authservice.controller;

import com.authservice.dto.RegistrationRequest;
import com.authservice.model.ApplicationUser;
import com.authservice.service.ApplicationUserService;
import com.authservice.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
public class AuthController {
    private final JwtUtils jwtUtils;
    private final ApplicationUserService applicationUserService;

    @Autowired
    public AuthController(JwtUtils jwtUtils, ApplicationUserService applicationUserService) {
        this.jwtUtils = jwtUtils;
        this.applicationUserService = applicationUserService;
    }

    @GetMapping("/refresh_token")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
//        TODO- HANDLE EXCEPTIONS
        String refresh_token = jwtUtils.extractToken(request);
//       Throws Exception if token missing
        if (refresh_token == null) throw new RuntimeException("Refresh token missing");
        try {
//            Throws Exception if refresh token is invalid else returns subject(Email)
            String email = jwtUtils.validateRefreshToken(refresh_token);
            Optional<ApplicationUser> optionalUser = applicationUserService.getUserByEmail(email);
//            throws Exception if Email doesn't exist in DB
            if (optionalUser.isEmpty()) throw new RuntimeException("User Doesn't exist");
//            All Conditions Are valid here
            ApplicationUser user = optionalUser.get();
            String access_token = jwtUtils.signToken(email, applicationUserService.getGrantedAuthorities(user));

//            TODO- EXTRACT TO OWN FUNCTION
            Map<String, String> tokens = new HashMap<>();
            tokens.put("access_token", access_token);
            tokens.put("refresh_token", refresh_token);
            jwtUtils.sendTokens(response, tokens);
        } catch (RuntimeException exception) {
            System.out.println(exception.getMessage());
            throw new RuntimeException(exception);
        }
    }

    @PostMapping("/register")
    public RegistrationRequest registerUser(@RequestBody @Valid RegistrationRequest registrationRequest) {
        return registrationRequest;
        // return new ResponseEntity<>(applicationUserService.registerUser(registrationRequest), HttpStatus.CREATED);

    }


}

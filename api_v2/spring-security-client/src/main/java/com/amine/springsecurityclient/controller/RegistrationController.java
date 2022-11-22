package com.amine.springsecurityclient.controller;


import com.amine.springsecurityclient.dto.PasswordResetRequest;
import com.amine.springsecurityclient.dto.UserRegistrationRequest;
import com.amine.springsecurityclient.event.RegistrationEvent;
import com.amine.springsecurityclient.model.PasswordResetToken;
import com.amine.springsecurityclient.model.User;
import com.amine.springsecurityclient.model.VerificationToken;
import com.amine.springsecurityclient.repository.PasswordResetTokenRepository;
import com.amine.springsecurityclient.repository.UserRepository;
import com.amine.springsecurityclient.repository.VerificationTokenRepository;
import com.amine.springsecurityclient.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
public class RegistrationController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final VerificationTokenRepository verificationTokenRepository;

    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final ApplicationEventPublisher publisher;

    private final Logger logger = LoggerFactory.getLogger(RegistrationController.class);


    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public String registerUser(@RequestBody UserRegistrationRequest userRegistrationRequest, HttpServletRequest httpServletRequest) {
        User user = userService.register(userRegistrationRequest);
        publisher.publishEvent(new RegistrationEvent(user, applicationUrl(httpServletRequest)));
        return "User created successfully";
    }

    @GetMapping("/verify-registration")
    public ResponseEntity<String> verifyEmail(@RequestParam("token") String token) {
        String result = userService.validateVerificationToken(token);
        if (result.equalsIgnoreCase("valid")) return new ResponseEntity<String>("Valid", HttpStatus.OK);
        return new ResponseEntity<String>("Not Valid", HttpStatus.BAD_REQUEST);

    }

    @GetMapping("/resend-token")
    public ResponseEntity<String> resendVerificationToken(@RequestParam("token") String oldToken, HttpServletRequest httpServletRequest) {
//        VerificationToken token = userService.generateNewVerificationToken(oldToken);
        Optional<VerificationToken> tokenOptional = verificationTokenRepository.findByToken(oldToken);
        if (tokenOptional.isPresent()) {
            VerificationToken token = tokenOptional.get();
            publisher.publishEvent(new RegistrationEvent(token.getUser(), applicationUrl(httpServletRequest)));
            verificationTokenRepository.delete(token);
            return new ResponseEntity<String>("Verification Link Sent", HttpStatus.OK);
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Token");
    }

    @PostMapping("/reset-password")
    public void resetPassword(@RequestBody PasswordResetRequest passwordResetRequest, HttpServletRequest httpServletRequest) {
        User user = userService.findUserByEmail(passwordResetRequest.getEmail());
        String token = UUID.randomUUID().toString();
        userService.createPasswordResetTokenForUser(user, token);
//        TODO: SEND URL VIA EMAIL
        String url = userService.buildResetPasswordUrl(token, user, applicationUrl(httpServletRequest));
        logger.info(url);
    }

    @PostMapping("save-password")
    public String savePassword(@RequestParam("token") String token, @RequestBody PasswordResetRequest passwordResetRequest) {

        Optional<PasswordResetToken> resetToken = passwordResetTokenRepository.findByToken(token);
        if (resetToken.isPresent()) {
            User user = resetToken.get().getUser();
            user.setPassword(passwordEncoder.encode(passwordResetRequest.getNewPassword()));
            userRepository.save(user);
            return "Success";
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Token");

    }

    @PostMapping("/change-password")
    public String changePassword(@RequestBody PasswordResetRequest passwordResetRequest) {
        Optional<User> user = userRepository.findUserByEmail(passwordResetRequest.getEmail());
        if (!user.isPresent()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No user was found");

        if (!passwordResetRequest.getOldPassword().equals(user.get().getPassword()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Veridy password");
        User aUser = user.get();
        aUser.setPassword(passwordEncoder.encode(passwordResetRequest.getNewPassword()));

        return "Success";

    }

    private String applicationUrl(HttpServletRequest httpServletRequest) {
        return "http://" + httpServletRequest.getServerName() + ":" + httpServletRequest.getServerPort() + httpServletRequest.getContextPath();
    }
}

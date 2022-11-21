package com.amine.springsecurityclient.service;


import com.amine.springsecurityclient.dto.UserRegistrationRequest;
import com.amine.springsecurityclient.model.PasswordResetToken;
import com.amine.springsecurityclient.model.User;
import com.amine.springsecurityclient.model.VerificationToken;
import com.amine.springsecurityclient.repository.PasswordResetTokenRepository;
import com.amine.springsecurityclient.repository.UserRepository;
import com.amine.springsecurityclient.repository.VerificationTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Calendar;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class UserService {
    private final VerificationTokenRepository verificationTokenRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final PasswordResetTokenRepository passwordResetTokenRepository;

    public User register(UserRegistrationRequest userRegistrationRequest) {
        User user = User.builder()
                .email(userRegistrationRequest.getEmail())
                .firstName(userRegistrationRequest.getFirstName())
                .lastName(userRegistrationRequest.getLastName())
                .password(passwordEncoder.encode(userRegistrationRequest.getPassword()))
                .role("USER")
                .build();

        userRepository.save(user);
        return user;
    }

    public void saveVerificationToken(String token, User user) {
        VerificationToken verificationToken = new VerificationToken(token, user);
        verificationTokenRepository.save(verificationToken);
    }

    public String validateVerificationToken(String token) {
        Optional<VerificationToken> verificationToken = verificationTokenRepository.findByToken(token);
        if (!verificationToken.isPresent()) return "Not Valid";

        User user = verificationToken.get().getUser();
        Calendar calendar = Calendar.getInstance();

        if (verificationToken.get().getExpirationTime().getTime() - calendar.getTime().getTime() <= 0) {
            verificationTokenRepository.delete(verificationToken.get());
            return "Token expired";
        }
        ;

        user.setEnabled(true);
        userRepository.save(user);
        return "valid";
    }

    public VerificationToken generateNewVerificationToken(String oldToken) {
        Optional<VerificationToken> verificationTokenOptional = verificationTokenRepository.findByToken(oldToken);
        if (verificationTokenOptional.isPresent()) {
            VerificationToken verificationToken = verificationTokenOptional.get();
            verificationToken.setToken(UUID.randomUUID().toString());
            verificationTokenRepository.save(verificationToken);
            return verificationToken;
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid token");
    }

    public User findUserByEmail(String email) {
        Optional<User> user = userRepository.findUserByEmail(email);
        if(user.isPresent()) return user.get();
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
    }

    public void createPasswordResetTokenForUser(User user, String token) {
        PasswordResetToken newToken = new PasswordResetToken(token, user);
        passwordResetTokenRepository.save(newToken);
    }

    public String buildResetPasswordUrl(String token, User user, String applicationUrl) {
        String url = applicationUrl + "/save-password?token=" + token;
         return url;
    }
}

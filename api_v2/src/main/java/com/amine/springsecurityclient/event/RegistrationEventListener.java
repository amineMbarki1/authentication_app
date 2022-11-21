package com.amine.springsecurityclient.event;

import com.amine.springsecurityclient.model.User;
import com.amine.springsecurityclient.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.UUID;

@RequiredArgsConstructor
@Component
public class RegistrationEventListener implements ApplicationListener<RegistrationEvent> {
    private final UserService userService;
    private final Logger logger = LoggerFactory.getLogger(RegistrationEventListener.class);

    @Override
    public void onApplicationEvent(RegistrationEvent event) {
        //Create Token
        User user = event.getUser();
        String token = UUID.randomUUID().toString();
        userService.saveVerificationToken(token, user);
        //Attach token to url
        String url = event.getApplicationUrl() + "/verify-registration?token=" + token;
        //TODO:Send verification Email with url
        logger.info("Click the link to verify your account: " + url);
    }
}

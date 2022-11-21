package com.amine.springsecurityclient.event;

import com.amine.springsecurityclient.model.User;
import lombok.Data;
import org.springframework.context.ApplicationEvent;

@Data
public class RegistrationEvent extends ApplicationEvent {
    private User user;
    private String applicationUrl;
    public RegistrationEvent(User user, String applicationUrl) {
        super(user);
        this.user = user;
        this.applicationUrl = applicationUrl;
    }
}

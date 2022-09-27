package com.authservice.service;

import com.authservice.dto.RegistrationRequest;
import com.authservice.model.ApplicationUser;
import com.authservice.repository.ApplicationUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ApplicationUserService {
    private ApplicationUserRepository applicationUserRepository;

    @Autowired
    public ApplicationUserService(ApplicationUserRepository applicationUserRepository) {
        this.applicationUserRepository = applicationUserRepository;
    }

    public Optional<ApplicationUser> getUserByEmail(String email) {
        return applicationUserRepository.findOneByEmailIgnoreCase(email);
    }

    public Set<GrantedAuthority> getGrantedAuthorities(ApplicationUser user) {
        return user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().getRole()))
                .collect(Collectors.toSet());
    }

    public ApplicationUser registerUser(RegistrationRequest registrationRequest) {

        return null;
    }
}

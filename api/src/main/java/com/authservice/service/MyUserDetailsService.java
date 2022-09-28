package com.authservice.service;


import com.authservice.model.ApplicationUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;


import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Component("userDetailsService")
public class MyUserDetailsService implements UserDetailsService {
    private ApplicationUserService applicationUserService;

    @Autowired
    public MyUserDetailsService(ApplicationUserService applicationUserService) {
        this.applicationUserService = applicationUserService;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<ApplicationUser> optionalUser = applicationUserService.getUserByEmail(email);
        if (!optionalUser.isPresent()) throw new UsernameNotFoundException("Account Not Found");
        ApplicationUser applicationUser = optionalUser.get();
        Set<GrantedAuthority> grantedAuthoritySet = applicationUser.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().getRole()))
                .collect(Collectors.toSet());
        return new User(applicationUser.getEmail(), applicationUser.getPassword(), grantedAuthoritySet);
    }
}

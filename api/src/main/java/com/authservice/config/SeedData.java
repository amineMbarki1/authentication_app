package com.authservice.config;

import com.authservice.model.ApplicationUser;
import com.authservice.model.ERole;
import com.authservice.model.Role;
import com.authservice.repository.ApplicationUserRepository;
import com.authservice.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class SeedData implements CommandLineRunner {
    private final ApplicationUserRepository applicationUserRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public SeedData(ApplicationUserRepository applicationUserRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.applicationUserRepository = applicationUserRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        Role ROLE_ADMIN =  new Role();
        ROLE_ADMIN.setName(ERole.ROLE_ADMIN);
        Role ROLE_USER = new Role(ERole.ROLE_USER);


        roleRepository.save(ROLE_ADMIN);roleRepository.save(ROLE_USER);

        ApplicationUser user = new ApplicationUser();
        user.setEmail("admin@gmail.com");
        user.setFirstName("Karim");
        user.setLastName("Hani");
        user.setPassword(passwordEncoder.encode("hello"));
        Set<Role> roles = new HashSet<>(); roles.add(ROLE_ADMIN);
        user.setRoles(roles);
        applicationUserRepository.save(user);

        ApplicationUser user2 = new ApplicationUser();
        user2.setEmail("user@gmail.com");
        user2.setPassword(passwordEncoder.encode("hello"));
        user2.setFirstName("Amine");
        user2.setLastName("Mbarki");
        Set<Role> roles2 = new HashSet<>(); roles2.add(ROLE_USER);
        user2.setRoles(roles2);
        applicationUserRepository.save(user2);

    }
}

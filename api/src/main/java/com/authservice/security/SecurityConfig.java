package com.authservice.security;

import com.authservice.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;



import static com.authservice.model.ERole.ROLE_ADMIN;
import static com.authservice.model.ERole.ROLE_USER;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfig {

    private static final String[] WHITE_LIST = {
            "/login/**",
            "/register/**",
            "/api",
            "/api/refresh_token"
    };
    private final AuthenticationConfiguration authenticationConfiguration;


    private JwtUtils jwtUtils;

    @Autowired
    public SecurityConfig(AuthenticationConfiguration authenticationConfiguration, JwtUtils jwtUtils) {
        this.authenticationConfiguration = authenticationConfiguration;
        this.jwtUtils = jwtUtils;
    }

    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf().disable();

        http.authorizeRequests().antMatchers(WHITE_LIST).permitAll();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);


        http.authorizeRequests()
                .antMatchers("/api/admin/test").hasAnyAuthority(ROLE_ADMIN.name())
                .antMatchers("/api/user/test").hasAnyAuthority(ROLE_ADMIN.name(), ROLE_USER.name());

        http.authorizeRequests().anyRequest().authenticated();

        http.addFilter(new CustomAuthenticationFilter(authenticationManager(), jwtUtils));
        http.addFilterAfter(new CutsomAuthorizationFilter(jwtUtils), CustomAuthenticationFilter.class);

        return http.build();
    }


}

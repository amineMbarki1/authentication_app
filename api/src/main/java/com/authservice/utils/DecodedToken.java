package com.authservice.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.authority.SimpleGrantedAuthority;


import java.util.Set;

@AllArgsConstructor
@Data
public class DecodedToken {
    private String subject;
    private Set<SimpleGrantedAuthority> authorities;
}

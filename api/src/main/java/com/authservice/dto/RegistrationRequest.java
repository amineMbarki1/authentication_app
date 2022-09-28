package com.authservice.dto;


import com.authservice.customValidation.FieldMatch;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;

@NoArgsConstructor
@AllArgsConstructor
@Data

@FieldMatch.List({
        @FieldMatch(first = "password", second = "passwordMatch", message = "Passwords Do not match")
})
public class RegistrationRequest {
    @NotNull(message = "firstName is required")
    @NotNull(message = "firstName shouldn't be empty")
    @Size(min = 3, message = "firstName must be at least 3 chars long")
    @Size(max = 10, message = "firstName must be less than 10 chars")
    private String firstName;

    @NotNull(message = "lastName is required")
    @NotNull(message = "lastName shouldn't be empty")
    @Size(min = 3, message = "lastName must be at least 3 chars long")
    @Size(max = 10, message = "lastName must be less than 10 chars")
    private String lastName;

    @Email(message = "Invalid email")
    private String email;

    @NotNull(message = "password is required")
    @NotBlank(message = "password is required")
    @Size(min = 6, message = "password must be at least 6 chars long")
    private String password;

    private String passwordMatch;


}

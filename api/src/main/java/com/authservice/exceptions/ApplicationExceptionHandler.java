package com.authservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ApplicationExceptionHandler {
    //    Handle Validation Errors
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationError(MethodArgumentNotValidException ex) {

        Map<String, String> errorMap = new HashMap<>();
        ex.getFieldErrors().stream().forEach((FieldError error) -> errorMap.put(error.getField(), error.getDefaultMessage()));
        return errorMap;
    }
}

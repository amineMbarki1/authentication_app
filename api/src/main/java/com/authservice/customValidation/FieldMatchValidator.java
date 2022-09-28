package com.authservice.customValidation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.BeanWrapperImpl;

public class FieldMatchValidator implements ConstraintValidator<FieldMatch, Object> {
    private String firstFieldName;
    private String secondFieldName;
    private String message;

    @Override
    public void initialize(FieldMatch constraintAnnotation) {
        this.firstFieldName = constraintAnnotation.first();
        this.secondFieldName = constraintAnnotation.second();
        this.message = constraintAnnotation.message();
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        Object firstFieldValue = new BeanWrapperImpl(value)
                .getPropertyValue(firstFieldName);
        Object secondFieldValue = new BeanWrapperImpl(value)
                .getPropertyValue(secondFieldName);
        boolean valid = firstFieldValue == null && secondFieldValue == null || firstFieldValue != null && firstFieldValue.equals(secondFieldValue);
        if (!valid)
            context.buildConstraintViolationWithTemplate(message).addPropertyNode(secondFieldName).addConstraintViolation().disableDefaultConstraintViolation();
        return valid;
    }


}

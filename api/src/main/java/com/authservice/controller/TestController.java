package com.authservice.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestController {
    @GetMapping
    public String test_public() {
        return "This resource is public";
    }

    @GetMapping("/user/test")
    public String test() {
        return "hey this rout is accessible by user or route";
    }

    @GetMapping("/admin/test")
    public String test_admin() {
        return "Hey this rout only accessible by admin";
    }
}

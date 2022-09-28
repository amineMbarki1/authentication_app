package com.authservice.model;


import lombok.*;


import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Role {
    @Id
    @Column(length = 16)
    @Enumerated(EnumType.STRING)
    private ERole name;

 }

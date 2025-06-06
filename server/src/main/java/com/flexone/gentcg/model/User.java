package com.flexone.gentcg.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.experimental.Accessors;

@Entity(name = "\"user\"")
@Data
@Accessors(chain = true)
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;
  String firstName;
  String lastName;
  String email;
  String phone;
  LocalDate dateOfBirth;
  String password;
  String roles;
}

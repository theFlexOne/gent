package com.flexone.gentcg.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class UserRequestDto {
  private String email;
  private String password;
  private String firstName;
  private String lastName;
  private String phone;
  private LocalDate dateOfBirth;
  private String roles;
}

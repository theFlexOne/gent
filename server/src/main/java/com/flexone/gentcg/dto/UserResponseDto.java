package com.flexone.gentcg.dto;

import java.time.LocalDate;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class UserResponseDto {
  private String email;
  private String firstName;
  private String lastName;
  private String phone;
  private LocalDate dateOfBirth;
}

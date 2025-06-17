package com.flexone.gentcg.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Accessors(chain = true)
public class AuthResponseDto {
  private String token;
  private String refreshToken;
  private UserResponseDto user = new UserResponseDto();
}

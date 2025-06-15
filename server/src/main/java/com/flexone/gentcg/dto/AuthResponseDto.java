package com.flexone.gentcg.dto;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class AuthResponseDto {
  private String token;
  private UserDto user;

  public AuthResponseDto() {
    this.user = new UserDto();
  }
}

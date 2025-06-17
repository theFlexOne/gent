package com.flexone.gentcg.dto;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class TokenRefreshResponseDto {
  private String accessToken;
  private String refreshToken;
  private String tokenType = "Bearer";
}
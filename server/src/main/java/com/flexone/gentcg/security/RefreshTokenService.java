package com.flexone.gentcg.security;

import java.time.Instant;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.flexone.gentcg.exception.TokenRefreshException;
import com.flexone.gentcg.model.RefreshToken;
import com.flexone.gentcg.model.User;
import com.flexone.gentcg.repository.RefreshTokenRepository;
import com.flexone.gentcg.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

  private final RefreshTokenRepository refreshTokenRepository;
  private final UserRepository userRepository;

  @Value("${jwt.refresh-ms:86400000}")
  private Long expirationMs;

  public Optional<RefreshToken> findByToken(String token) {
    return refreshTokenRepository.findByToken(token);
  }

  public RefreshToken createRefreshToken(Long userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found"));

    RefreshToken refreshToken = new RefreshToken()
        .setUser(user)
        .setToken(RefreshToken.generateRefreshToken())
        .setExpiryDate(Instant.now().plusMillis(expirationMs));

    return refreshTokenRepository.save(refreshToken);
  }

  public RefreshToken verifyExpiration(RefreshToken token) {
    if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
      refreshTokenRepository.delete(token);
      throw new TokenRefreshException(token.getToken(),
          "Refresh token is expired. Please login again.");
    }
    return token;
  }

  @Transactional
  public int deleteByUserId(Long userId) {
    return refreshTokenRepository.deleteByUser(
        userRepository.findById(userId).orElseThrow(
            () -> new RuntimeException("User not found with id: " + userId)));
  }

}

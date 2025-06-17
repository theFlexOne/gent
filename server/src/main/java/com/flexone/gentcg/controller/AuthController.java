package com.flexone.gentcg.controller;

import com.flexone.gentcg.dto.AuthRequestDto;
import com.flexone.gentcg.dto.AuthResponseDto;
import com.flexone.gentcg.dto.TokenRefreshRequestDto;
import com.flexone.gentcg.dto.TokenRefreshResponseDto;
import com.flexone.gentcg.dto.UserResponseDto;
import com.flexone.gentcg.dto.UserRequestDto;
import com.flexone.gentcg.exception.TokenRefreshException;
import com.flexone.gentcg.model.RefreshToken;
import com.flexone.gentcg.model.User;
import com.flexone.gentcg.security.JwtUtil;
import com.flexone.gentcg.security.RefreshTokenService;
import com.flexone.gentcg.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthenticationManager authenticationManager;
  private final JwtUtil jwtUtil;
  private final UserService userService;
  private final RefreshTokenService refreshTokenService;

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody AuthRequestDto authRequest) {
    try {
      String token = authenticate(authRequest.getEmail(), authRequest.getPassword());
      User user = userService.findByEmail(authRequest.getEmail());
      RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());
      AuthResponseDto authResponse = generateAuthResponse(user, token, refreshToken);

      return ResponseEntity.ok(authResponse);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    }
  }

  @PostMapping("/register")
  public ResponseEntity<?> register(@Valid @RequestBody UserRequestDto userRequest) {
    User user = userService.findByEmail(userRequest.getEmail());

    if (user != null) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
    }

    user = userService.createUser(userRequest);

    if (user == null) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to register user");
    }

    String token = authenticate(userRequest.getEmail(), userRequest.getPassword());
    RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());
    return ResponseEntity.ok(generateAuthResponse(user, token, refreshToken));
  }

  @PostMapping("/refresh-token")
  public ResponseEntity<?> refreshToken(@RequestBody TokenRefreshRequestDto request) {
    String requestRefreshToken = request.getRefreshToken();

    return refreshTokenService.findByToken(requestRefreshToken)
        .map(refreshTokenService::verifyExpiration)
        .map(RefreshToken::getUser)
        .map(user -> {
          String token = jwtUtil.generateTokenFromUsername(user.getEmail());
          return ResponseEntity.ok(new TokenRefreshResponseDto()
              .setAccessToken(token)
              .setRefreshToken(requestRefreshToken));
        })
        .orElseThrow(() -> new TokenRefreshException(requestRefreshToken,
            "Refresh token is not in database!"));
  }

  @PostMapping("/logout")
  public ResponseEntity<?> logoutUser(@RequestBody TokenRefreshRequestDto request) {
    refreshTokenService.findByToken(request.getRefreshToken())
        .ifPresent(token -> {
          refreshTokenService.deleteByUserId(token.getUser().getId());
        });

    return ResponseEntity.ok("Log out successful");
  }

  private UserResponseDto mapUserToUserDto(User user) {
    return new UserResponseDto()
        .setEmail(user.getEmail())
        .setFirstName(user.getCustomer().getFirstName())
        .setLastName(user.getCustomer().getLastName())
        .setPhone(user.getCustomer().getPhone())
        .setDateOfBirth(user.getCustomer().getDateOfBirth());
  }

  private String authenticate(String email, String password) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(email, password));

    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    String token = jwtUtil.generateToken(userDetails);

    return token;
  }

  private AuthResponseDto generateAuthResponse(User user, String token, RefreshToken refreshToken) {
    return new AuthResponseDto()
        .setToken(token)
        .setRefreshToken(refreshToken.getToken())
        .setUser(mapUserToUserDto(user));
  }
}
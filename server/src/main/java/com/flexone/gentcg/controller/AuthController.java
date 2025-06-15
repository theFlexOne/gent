package com.flexone.gentcg.controller;

import com.flexone.gentcg.dto.AuthRequestDto;
import com.flexone.gentcg.dto.AuthResponseDto;
import com.flexone.gentcg.dto.UserDto;
import com.flexone.gentcg.dto.UserRequestDto;
import com.flexone.gentcg.model.User;
import com.flexone.gentcg.security.JwtUtil;
import com.flexone.gentcg.service.UserService;

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

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody AuthRequestDto authRequest) {
    try {
      String token = authenticate(authRequest.getEmail(), authRequest.getPassword());
      AuthResponseDto authResponse = generateAuthResponse(token, userService.findByEmail(authRequest.getEmail()));

      return ResponseEntity.ok(authResponse);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    }
  }

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody UserRequestDto userRequest) {
    User user = userService.findByEmail(userRequest.getEmail());

    if (user != null) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
    }

    user = userService.createUser(userRequest);

    if (user == null) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to register user");
    }

    String token = authenticate(userRequest.getEmail(), userRequest.getPassword());
    return ResponseEntity.ok(generateAuthResponse(token, user));
  }

  private UserDto mapUserToUserDto(User user) {
    return new UserDto()
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

  private AuthResponseDto generateAuthResponse(String token, User user) {
    return new AuthResponseDto()
        .setToken(token)
        .setUser(mapUserToUserDto(user));
  }
}
package com.flexone.gentcg.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

  // Authentication Errors (1000-1999)
  INVALID_CREDENTIALS(1001, "Invalid username or password."),
  USER_NOT_FOUND(1002, "User not found."),
  ACCOUNT_LOCKED(1003, "Account is locked."),
  ACCOUNT_DISABLED(1004, "Account is disabled."),
  PASSWORD_MISMATCH(1005, "Password does not match."),

  // Validation Errors (2000-2999)
  VALIDATION_ERROR(2001, "Validation error."),
  INVALID_EMAIL_FORMAT(2002, "Invalid email format."),
  PASSWORD_TOO_WEAK(2003, "Password is too weak."),
  USERNAME_TAKEN(2004, "Username is already taken."),
  EMAIL_ALREADY_REGISTERED(2005, "Email is already registered.");

  // Business Errors (3000-3999)
  // Other Errors (4000-4999)

  private final int code;
  private final String message;
}
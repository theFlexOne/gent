package com.flexone.gentcg.exception;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiError {
  private LocalDateTime timestamp;
  private int status;
  private int code;
  private String message;
  private String path;
  private List<ValidationError> validationErrors = new ArrayList<>();

  public ApiError(LocalDateTime timestamp, int status, int code, String message, String path) {
    this.timestamp = timestamp;
    this.status = status;
    this.code = code;
    this.message = message;
    this.path = path;
  }

  public void addValidationError(ValidationError validationError) {
    validationErrors.add(validationError);
  }
}

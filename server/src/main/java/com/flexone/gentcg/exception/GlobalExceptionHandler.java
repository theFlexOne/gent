package com.flexone.gentcg.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(TokenRefreshException.class)
  public ResponseEntity<?> handleTokenRefreshException(TokenRefreshException ex, WebRequest request) {

    Map<String, Object> body = new HashMap<>();
    body.put("timestamp", new Date());
    body.put("status", HttpStatus.FORBIDDEN.value());
    body.put("error", HttpStatus.FORBIDDEN.getReasonPhrase());
    body.put("message", ex.getMessage());
    body.put("path", request.getDescription(false));

    return new ResponseEntity<>(body, HttpStatus.FORBIDDEN);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiError> handleValidationExceptions(
      MethodArgumentNotValidException ex, WebRequest request) {
    log.error("Validation error: " + ex.getMessage());

    ApiError apiError = new ApiError(
        LocalDateTime.now(),
        HttpStatus.BAD_REQUEST.value(),
        ErrorCode.VALIDATION_ERROR.getCode(),
        "Validation failed",
        request.getDescription(false));

    ex.getBindingResult().getFieldErrors().forEach(error -> {
      apiError.addValidationError(new ValidationError(error.getField(), error.getDefaultMessage()));
    });

    return new ResponseEntity<>(apiError, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(BaseException.class)
  public ResponseEntity<ApiError> handleBaseException(BaseException ex, WebRequest request) {
    log.error("Base error: " + ex.getMessage());

    ApiError apiError = new ApiError(
        LocalDateTime.now(),
        ex.getStatus().value(),
        ex.getErrorCode(),
        ex.getMessage(),
        request.getDescription(false));
    return new ResponseEntity<>(apiError, ex.getStatus());
  }
}
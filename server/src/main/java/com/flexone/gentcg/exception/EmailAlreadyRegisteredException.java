package com.flexone.gentcg.exception;

import org.springframework.http.HttpStatus;

public class EmailAlreadyRegisteredException extends BaseException {
  public EmailAlreadyRegisteredException() {
    super(
        ErrorCode.EMAIL_ALREADY_REGISTERED.getCode(),
        ErrorCode.EMAIL_ALREADY_REGISTERED.getMessage(),
        HttpStatus.BAD_REQUEST);
  }
}

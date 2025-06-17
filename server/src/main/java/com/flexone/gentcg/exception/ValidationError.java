package com.flexone.gentcg.exception;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ValidationError {
  String field;
  String message;
}

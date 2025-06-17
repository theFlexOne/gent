package com.flexone.gentcg.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Transient;
import lombok.Data;
import lombok.experimental.Accessors;

@Entity(name = "user_data")
@Data
@Accessors(chain = true)
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String password;
  private String roles;

  @Transient
  public String getEmail() {
    return this.customer != null ? this.customer.getEmail() : null;
  }

  public void setEmail(String email) {
    if (this.customer != null) {
      this.customer.setEmail(email);
    }
  }

  @OneToOne(cascade = CascadeType.ALL)
  @JsonIgnore
  private Customer customer;
}

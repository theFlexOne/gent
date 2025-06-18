package com.flexone.gentcg.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.flexone.gentcg.dto.UserRequestDto;
import com.flexone.gentcg.model.Customer;
import com.flexone.gentcg.model.User;
import com.flexone.gentcg.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public User findByEmail(String email) {
    return userRepository.findByCustomerEmail(email).orElse(null);
  }

  public User createUser(UserRequestDto userRequest) {
    Customer customer = new Customer()
        .setFirstName(userRequest.getFirstName())
        .setLastName(userRequest.getLastName())
        .setEmail(userRequest.getEmail())
        .setPhone(userRequest.getPhone())
        .setDateOfBirth(userRequest.getDateOfBirth());

    String roles = userRequest.getRoles() == null ||
        userRequest.getRoles().isEmpty() ? "USER" : userRequest.getRoles();

    User user = new User()
        .setPassword(passwordEncoder.encode(userRequest.getPassword()))
        .setRoles(roles)
        .setCustomer(customer);

    user = userRepository.save(user);

    return user;
  }
}

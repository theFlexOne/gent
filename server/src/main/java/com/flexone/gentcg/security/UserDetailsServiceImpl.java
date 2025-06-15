package com.flexone.gentcg.security;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.flexone.gentcg.model.User;
import com.flexone.gentcg.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

  private final UserService userService;

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    User user = userService.findByEmail(email);

    if (user == null) {
      throw new UsernameNotFoundException("User not found");
    }

    List<GrantedAuthority> authorities = new ArrayList<>();
    for (String role : user.getRoles().split(",")) {
      authorities.add(new SimpleGrantedAuthority("ROLE_" + role));
    }

    return new org.springframework.security.core.userdetails.User(
        user.getEmail(),
        user.getPassword(),
        authorities.isEmpty() ? Collections.emptyList() : authorities);
  }
}

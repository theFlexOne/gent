package com.flexone.gentcg.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.flexone.gentcg.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findByCustomerEmail(@Param("email") String email);

}

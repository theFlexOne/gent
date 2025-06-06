package com.flexone.gentcg.repository;

import org.springframework.stereotype.Repository;

import com.flexone.gentcg.model.Location;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Integer> {

  Optional<Location> findByPath(String path);
}

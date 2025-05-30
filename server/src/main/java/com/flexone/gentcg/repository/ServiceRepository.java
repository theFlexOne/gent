package com.flexone.gentcg.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flexone.gentcg.model.Service;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Integer> {
}

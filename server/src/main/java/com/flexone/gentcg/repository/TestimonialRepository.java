package com.flexone.gentcg.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flexone.gentcg.model.Testimonial;

@Repository
public interface TestimonialRepository extends JpaRepository<Testimonial, Integer> {
}

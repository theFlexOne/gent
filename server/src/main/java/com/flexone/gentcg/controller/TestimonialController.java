package com.flexone.gentcg.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flexone.gentcg.model.Testimonial;
import com.flexone.gentcg.repository.TestimonialRepository;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/testimonials")
public class TestimonialController {

  private final TestimonialRepository testimonialRepository;

  public TestimonialController(TestimonialRepository testimonialRepository) {
    this.testimonialRepository = testimonialRepository;
  }

  @GetMapping("/")
  public List<Testimonial> getMethodName() {
    return testimonialRepository.findAll();
  }

}

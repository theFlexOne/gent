package com.flexone.gentcg.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flexone.gentcg.model.Testimonial;
import com.flexone.gentcg.repository.TestimonialRepository;

import static java.util.Objects.isNull;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/testimonials")
public class TestimonialController {

  private final TestimonialRepository testimonialRepository;

  public TestimonialController(TestimonialRepository testimonialRepository) {
    this.testimonialRepository = testimonialRepository;
  }

  @GetMapping({ "/", "" })
  public List<Testimonial> getTestimonials(@RequestParam(required = false) Integer limit) {
    return testimonialRepository.findAll()
        .stream()
        .limit(limit == null ? 5 : limit)
        .toList();
  }

}

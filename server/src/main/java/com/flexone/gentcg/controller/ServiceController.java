package com.flexone.gentcg.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flexone.gentcg.model.Service;
import com.flexone.gentcg.service.ServiceService;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/services")
public class ServiceController {

  private final ServiceService serviceService;

  public ServiceController(ServiceService serviceService) {
    this.serviceService = serviceService;
  }

  @GetMapping({ "/", "" })
  public List<Service> getServices() {
    return serviceService.getServices();
  }

}

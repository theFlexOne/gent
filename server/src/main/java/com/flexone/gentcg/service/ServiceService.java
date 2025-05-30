package com.flexone.gentcg.service;

import java.util.List;

import com.flexone.gentcg.model.Service;
import com.flexone.gentcg.repository.ServiceRepository;

@org.springframework.stereotype.Service
public class ServiceService {
  public final ServiceRepository serviceRepository;

  public ServiceService(ServiceRepository serviceRepository) {
    this.serviceRepository = serviceRepository;
  }

  public List<Service> getServices() {
    return serviceRepository.findAll();
  }
}

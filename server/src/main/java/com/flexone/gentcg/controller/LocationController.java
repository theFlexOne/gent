package com.flexone.gentcg.controller;

import static java.util.Objects.isNull;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flexone.gentcg.model.Location;
import com.flexone.gentcg.repository.LocationRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/locations")
public class LocationController {

  private final LocationRepository locationRepository;

  public LocationController(LocationRepository locationRepository) {
    this.locationRepository = locationRepository;
  }

  @GetMapping()
  public List<Location> getLocations() {
    return locationRepository.findAll();
  }

  @GetMapping("/{id}")
  public Location getLocation(@PathVariable int id) {
    return locationRepository.findById(id).orElse(null);
  }

}

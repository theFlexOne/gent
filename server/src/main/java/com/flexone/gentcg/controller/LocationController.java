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
@RequestMapping("/api/locations")
public class LocationController {

  private final LocationRepository locationRepository;

  public LocationController(LocationRepository locationRepository) {
    this.locationRepository = locationRepository;
  }

  @GetMapping({ "/", "" })
  public List<Location> getLocations() {
    return locationRepository.findAll();
  }

  @GetMapping("/{path}")
  public Location getLocation(@PathVariable String path) {
    return locationRepository.findByPath(path).orElse(null);
  }

}

package com.flexone.gentcg.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.flexone.gentcg.model.Location;
import com.flexone.gentcg.repository.LocationRepository;

@Service
public class LocationService {

  private final LocationRepository locationRepository;

  public LocationService(LocationRepository locationRepository) {
    this.locationRepository = locationRepository;
  }

  public List<Location> getLocations() {
    return locationRepository.findAll();
  }

  public Location getLocation(int id) {
    return locationRepository.findById(id).orElse(null);
  }
}

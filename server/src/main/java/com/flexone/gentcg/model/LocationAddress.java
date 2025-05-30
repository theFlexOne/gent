package com.flexone.gentcg.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LocationAddress {

  @Id
  private int id;
  private String street;
  private String city;
  private String state;
  private String zip;

  @OneToOne
  @JoinColumn(name = "location_id")
  @JsonBackReference
  private Location location;
}

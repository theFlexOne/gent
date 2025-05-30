package com.flexone.gentcg.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Location {

  @Id
  private int id;
  private String path;
  private String phone;
  private String note;
  private String googleMapLink;

  @OneToOne(mappedBy = "location", cascade = CascadeType.ALL)
  @JsonManagedReference
  @JsonProperty("address")
  private LocationAddress locationAddress;

  @OneToMany(mappedBy = "location", cascade = CascadeType.ALL)
  @JsonManagedReference
  private List<Stylist> stylists;

  @OneToMany(mappedBy = "location", cascade = CascadeType.ALL)
  @JsonManagedReference
  private List<LocationHours> locationHours;
}

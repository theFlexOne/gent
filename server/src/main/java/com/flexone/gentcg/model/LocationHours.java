package com.flexone.gentcg.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LocationHours {

  @Id
  private int id;
  private int day;
  private String open;
  private String close;

  @ManyToOne
  @JsonBackReference
  private Location location;
}

package com.flexone.gentcg.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class LocationHours {

  @Id
  private Long id;
  private Integer day;
  private String open;
  private String close;

  @ManyToOne
  @JsonBackReference
  private Location location;
}

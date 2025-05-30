package com.flexone.gentcg.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Stylist {

  @Id
  private int id;
  private String name;
  private String title;
  private String profileImage;
  private String bio;

  @ManyToOne
  @JsonBackReference
  private Location location;

  @ManyToMany(fetch = FetchType.EAGER, cascade = { CascadeType.PERSIST, CascadeType.MERGE })
  @JoinTable(name = "stylist_service", joinColumns = { @JoinColumn(name = "stylist_id") }, inverseJoinColumns = {
      @JoinColumn(name = "service_id") })
  private List<Service> services;
}

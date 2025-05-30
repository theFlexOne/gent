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
public class StylistService {

  @Id
  private int id;
  private int price;

  @ManyToOne
  @JsonBackReference
  private Service service;

  @ManyToOne
  @JsonBackReference
  private Stylist stylist;
}

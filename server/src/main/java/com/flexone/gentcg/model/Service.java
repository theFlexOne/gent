package com.flexone.gentcg.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Service {

  @Id
  private int id;
  private String name;
  private String description;

  @ManyToMany(mappedBy = "services")
  @JsonBackReference
  private List<Stylist> stylists;

  @OneToMany(mappedBy = "service")
  @JsonManagedReference
  private List<StylistService> stylistServices;

  private Double price(int stylistId) {
    for (StylistService stylistService : stylistServices) {
      if (stylistService.getStylist().getId() == stylistId) {
        return Double.valueOf(stylistService.getPrice());
      }
    }
    return null;
  }

}

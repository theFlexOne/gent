package com.flexone.gentcg.model;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.List;
import java.util.Locale;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Transient;
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

  @Transient
  @JsonInclude(JsonInclude.Include.NON_ABSENT)
  private Integer price;

  public void setPrice(Stylist stylist) {
    for (StylistService stylistService : stylistServices) {
      if (stylistService.getStylist().getId() == stylist.getId()) {
        this.price = stylistService.getPrice();
      }
    }
  }

  @ManyToMany(mappedBy = "services")
  @JsonBackReference
  private List<Stylist> stylists;

  @JsonIgnore
  @OneToMany(mappedBy = "service")
  private List<StylistService> stylistServices;

}

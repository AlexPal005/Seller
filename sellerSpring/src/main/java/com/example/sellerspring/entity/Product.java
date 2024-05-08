package com.example.sellerspring.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String name;
    private String description;
    private double price;
    private byte[] image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinTable(name = "category_id")
    private Category category;

}

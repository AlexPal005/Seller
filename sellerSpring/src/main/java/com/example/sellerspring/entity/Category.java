package com.example.sellerspring.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "category_id")
    private Long id;
    @Column(name = "category_name")
    private String name;
    @Column(name = "parent_id")
    private Long parentId;
    @JsonManagedReference
    @OneToMany(mappedBy = "category")
    private List<Product> products;

    public void addProduct(Product product) {
        products.add(product);
        product.setCategory(this);
    }
}

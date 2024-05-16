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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long id;

    @Column(name = "category_name")
    private String name;

    @Column(name = "parent_id")
    private Long parentId;

    @Lob
    @Column(name = "category_image", columnDefinition = "LONGBLOB")
    private byte[] image;

    @JsonManagedReference
    @OneToMany(mappedBy = "category")
    private List<Product> products;

}

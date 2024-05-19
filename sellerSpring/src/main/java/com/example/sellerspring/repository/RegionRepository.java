package com.example.sellerspring.repository;

import com.example.sellerspring.entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegionRepository extends JpaRepository<Region, Long> {

    Region getRegionByRegionName(String regionName);

    Boolean existsRegionByRegionName(String regionName);
}

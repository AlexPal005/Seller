package com.example.sellerspring.service;

import com.example.sellerspring.entity.Region;
import com.example.sellerspring.repository.RegionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RegionService {
    private final RegionRepository regionRepository;

    public Region getRegionByName(String regionName) {
        return regionRepository.getRegionByRegionName(regionName);
    }

}

package com.example.sellerspring.repository;

import com.example.sellerspring.entity.City;
import com.example.sellerspring.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CityRepository extends JpaRepository<City, Long> {

    @Query(value = "SELECT city.* " +
            "FROM city " +
            "         INNER JOIN region r on city.region_id = r.region_id " +
            "WHERE city.city_name = :cityName " +
            "  AND r.region_name = :regionName ",
            nativeQuery = true)
    Optional<City> getCityByCityNameAndRegionName(@Param("cityName") String cityName, @Param("regionName") String regionName);
}

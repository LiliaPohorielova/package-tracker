package com.tracker.parcel.repository;

import com.tracker.parcel.entity.Package;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PackageRepository extends JpaRepository<Package, Long> {

    List<Package> findAllByOrderByIdDesc();
}

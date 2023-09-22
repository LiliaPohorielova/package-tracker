package com.tracker.parcel.repository;

import com.tracker.parcel.entity.Package;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PackageRepository extends JpaRepository<Package, Long> {

}

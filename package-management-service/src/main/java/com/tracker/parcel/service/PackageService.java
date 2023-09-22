package com.tracker.parcel.service;

import com.tracker.parcel.entity.Package;
import java.util.List;

public interface PackageService {

    Package createPackage(Package request);
    Package updatePackage(Long id, Package request);
    Package getPackageById(Long id);
    void deletePackageById(Long id);
    List<Package> getAllPackages();
}

package com.tracker.parcel.service;

import com.tracker.parcel.entity.Package;
import com.tracker.parcel.model.request.PackageRequest;
import java.util.List;

public interface PackageService {

    Package createPackage(PackageRequest request);
    Package updatePackage(Long id, Package request);
    Package getPackageById(Long id);
    void deletePackageById(Long id);
    List<Package> getAllPackages();
    Package sendPackage(Package request);
}

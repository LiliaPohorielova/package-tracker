package com.tracker.parcel.service.impl;

import com.tracker.parcel.entity.Package;
import com.tracker.parcel.exception.ResourceNotFoundException;
import com.tracker.parcel.mapper.PackageMapper;
import com.tracker.parcel.model.request.PackageRequest;
import com.tracker.parcel.repository.PackageRepository;
import com.tracker.parcel.service.PackageService;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class PackageServiceImpl implements PackageService {

    private final PackageRepository packageRepository;

    @Override
    public Package createPackage(PackageRequest request) {
        Package created = PackageMapper.INSTANCE.toPackage(request);
        return packageRepository.save(created);
    }

    @Override
    public Package updatePackage(Long id, Package request) {
        packageRepository.findById(id).orElseThrow(() -> {
            log.warn("Package with id = {} not found", id);
            return new ResourceNotFoundException("Package", id.toString());
        });
        return packageRepository.save(request);
    }

    @Override
    public Package getPackageById(Long id) {
        return packageRepository.findById(id).orElseThrow(() -> {
            log.warn("Package with id = {} not found", id);
            return new ResourceNotFoundException("Package", id.toString());
        });
    }

    @Override
    public void deletePackageById(Long id) {
        packageRepository.findById(id).orElseThrow(() -> {
            log.warn("Package with id = {} not found", id);
            return new ResourceNotFoundException("Package", id.toString());
        });
        packageRepository.deleteById(id);
    }

    @Override
    public List<Package> getAllPackages() {
        return packageRepository.findAll();
    }

    @Override
    public Package sendPackage(Package request) {
        // TODO: Send kafka event to notify delivery service
        return null;
    }

    public void deleteAllPackages() {
        packageRepository.deleteAll();
    }
}

package com.tracker.parcel.controller;

import com.tracker.parcel.entity.Package;
import com.tracker.parcel.model.request.PackageRequest;
import com.tracker.parcel.service.PackageService;
import com.tracker.parcel.service.impl.PackageServiceImpl;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/packages")
@CrossOrigin
@AllArgsConstructor
public class PackageController {

    private final PackageService packageService;
    
    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public List<Package> getAllPackages() {
        return packageService.getAllPackages();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Package getPackageById(@PathVariable Long id) {
        return packageService.getPackageById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Package createPackage(@RequestBody PackageRequest request) {
        return packageService.createPackage(request);
    }

    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Package updatePackage(@PathVariable Long id, 
        @RequestBody Package request) {
        return packageService.updatePackage(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<Package> removePackage(@PathVariable Long id) {
        packageService.deletePackageById(id);
        return packageService.getAllPackages();
    }

    @DeleteMapping("/all")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeAllPackages() {
        packageService.deleteAllPackages();
    }

    @PostMapping("/send")
    @ResponseStatus(HttpStatus.OK)
    public Package sendPackage(@RequestBody Package request) {
        return packageService.sendPackage(request);
    }
}

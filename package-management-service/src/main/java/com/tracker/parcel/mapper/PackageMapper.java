package com.tracker.parcel.mapper;

import com.tracker.parcel.entity.Package;
import com.tracker.parcel.model.request.PackageRequest;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PackageMapper {

    PackageMapper INSTANCE = Mappers.getMapper(PackageMapper.class);

    Package toPackage(PackageRequest packageRequest);
}

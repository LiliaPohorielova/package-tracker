package com.tracker.parcel.mapper;

import com.tracker.parcel.entity.Delivery;
import com.tracker.parcel.entity.Package;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface DeliveryMapper {

    DeliveryMapper INSTANCE = Mappers.getMapper(DeliveryMapper.class);

    Delivery toDelivery(Package packageRequest);
}

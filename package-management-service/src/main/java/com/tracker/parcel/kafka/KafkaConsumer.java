package com.tracker.parcel.kafka;

import com.tracker.parcel.entity.Delivery;
import com.tracker.parcel.entity.Package;
import com.tracker.parcel.entity.Status;
import com.tracker.parcel.mapper.PackageMapper;
import com.tracker.parcel.service.PackageService;
import com.tracker.parcel.service.impl.PackageServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class KafkaConsumer {

    private final PackageService packageService;

    @KafkaListener(topics = "delivery_package_event", groupId = "package_management_service")
    public void deliveryEventConsumer(Delivery deliveryEvent) {
        log.info("Consumer consume Kafka message -> {}", deliveryEvent);
        Long packageId = deliveryEvent.getId();
        Package packageEntity = packageService.getPackageById(deliveryEvent.getId()).toBuilder()
                .status(deliveryEvent.getStatus())
                .progress(deliveryEvent.getProgress())
                .build();
        packageService.updatePackage(packageId, packageEntity);

        // write your handlers and post-processing logic, based on your use case
    }
}

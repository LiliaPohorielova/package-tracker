package com.tracker.parcel.kafka;

import com.tracker.parcel.entity.Delivery;
import com.tracker.parcel.entity.Notification;
import com.tracker.parcel.entity.Package;
import com.tracker.parcel.service.PackageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import static com.tracker.parcel.entity.Status.DELIVERED;

@Slf4j
@Component
@RequiredArgsConstructor
public class KafkaConsumer {

    private final PackageService packageService;
    private final KafkaProducer kafkaProducer;

    @KafkaListener(topics = "delivery_package_event", groupId = "package_management_service")
    public void deliveryEventConsumer(Delivery deliveryEvent) {
        log.info("Consumer consume Kafka message -> {}", deliveryEvent);
        Long packageId = deliveryEvent.getId();
        Package packageEntity = packageService.getPackageById(deliveryEvent.getId()).toBuilder()
                .status(deliveryEvent.getStatus())
                .progress(deliveryEvent.getProgress())
                .build();
        packageService.updatePackage(packageId, packageEntity);
        if (DELIVERED == deliveryEvent.getStatus()) {
            Notification notification = Notification.builder()
                    .id(deliveryEvent.getId())
                    .packageTitle(deliveryEvent.getTitle())
                    .recipient(packageEntity.getRecipientName() + " " + packageEntity.getRecipientSurname())
                    .message(packageEntity.getDestinationPostalBranch() + ", " + packageEntity.getDestinationCity() +
                            ", " + packageEntity.getDestinationRegion())
                    .build();
            kafkaProducer.sendNotification(notification);
        }
    }
}

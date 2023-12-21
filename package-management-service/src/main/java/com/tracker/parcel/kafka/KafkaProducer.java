package com.tracker.parcel.kafka;

import com.tracker.parcel.entity.Notification;
import com.tracker.parcel.entity.Package;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class KafkaProducer {

    public static final String SEND_PACKAGE_EVENT_TOPIC = "send_package_event";
    public static final String SEND_NOTIFICATION_TOPIC = "send_notification";

    private final KafkaTemplate<String, Package> kafkaPackageTemplate;
    private final KafkaTemplate<String, Notification> kafkaNotificationTemplate;

    public void sendPackageEvent(Package packageEvent) {
        String key = packageEvent.getId().toString();
        kafkaPackageTemplate.send(SEND_PACKAGE_EVENT_TOPIC, key, packageEvent);
        log.info("Producer produced the message {}", packageEvent);
    }

    public void sendNotification(Notification notification) {
        String key = notification.getId().toString();
        kafkaNotificationTemplate.send(SEND_NOTIFICATION_TOPIC, key, notification);
        log.info("Producer produced the message {}", notification);
    }
}

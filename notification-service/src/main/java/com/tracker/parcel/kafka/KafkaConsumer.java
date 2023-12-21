package com.tracker.parcel.kafka;

import com.tracker.parcel.entity.Notification;
import com.tracker.parcel.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class KafkaConsumer {

    private final NotificationService notificationService;

    @SneakyThrows
    @KafkaListener(topics = "send_notification", groupId = "notification_service")
    public void packageEventConsumer(Notification notification) {
        notificationService.sendNotification(notification);
    }
}

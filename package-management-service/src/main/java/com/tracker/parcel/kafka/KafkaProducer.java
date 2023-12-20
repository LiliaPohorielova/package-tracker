package com.tracker.parcel.kafka;

import com.tracker.parcel.entity.Package;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class KafkaProducer {

    public static final String TOPIC = "send_package_event";

    private final KafkaTemplate<String, Package> kafkaTemplate;

    public void sendPackageEvent(Package packageEvent) {
        String key = packageEvent.getId().toString();
        kafkaTemplate.send(TOPIC, key, packageEvent);
        log.info("Producer produced the message {}", packageEvent);
        // write your handlers and post-processing logic, based on your use case
    }
}

package com.tracker.parcel.kafka;

import com.tracker.parcel.entity.Delivery;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class KafkaProducer {

    public static final String TOPIC = "delivery_package_event";

    private final KafkaTemplate<String, Delivery> kafkaTemplate;

    public void sendDeliveryEvent(Delivery deliveryEvent) {
        String key = deliveryEvent.getId().toString();
        kafkaTemplate.send(TOPIC, key, deliveryEvent);
        log.info("Producer produced the message {}", deliveryEvent);
        // write your handlers and post-processing logic, based on your use case
    }
}

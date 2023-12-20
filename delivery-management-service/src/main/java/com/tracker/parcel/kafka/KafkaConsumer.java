package com.tracker.parcel.kafka;

import com.tracker.parcel.entity.Delivery;
import com.tracker.parcel.entity.Package;
import com.tracker.parcel.entity.Status;
import com.tracker.parcel.mapper.DeliveryMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class KafkaConsumer {

    private final KafkaProducer kafkaProducer;

    @SneakyThrows
    @KafkaListener(topics = "send_package_event", groupId = "delivery_management_service")
    public void packageEventConsumer(Package packageEvent) {
        log.info("Consumer consume Kafka message -> {}", packageEvent);
        Delivery delivery = DeliveryMapper.INSTANCE.toDelivery(packageEvent);
        String sourceCity = delivery.getSourceCity();
        String destinationCity = delivery.getDestinationCity();
        Integer progress = delivery.getProgress();
        //TODO: MAKE NON BLOCKING REQUESTS
        Thread.sleep(5000); // Sleep for 5 seconds (adjust as needed)
        while (progress < 100) {
            progress = calculateProgress(sourceCity, destinationCity, progress);
            Status status = calculateStatus(progress);
            kafkaProducer.sendDeliveryEvent(delivery.toBuilder().progress(progress).status(status).build());
            Thread.sleep(500); // Sleep for 0.5 second (adjust as needed)
        }
    }

    private Integer calculateProgress(String sourceCity, String destinationCity, Integer previousProgress) {
        // 1. get lat and lng of cities
        double sourceLat = getCityLatitude(sourceCity);
        double sourceLng = getCityLongitude(sourceCity);
        double destLat = getCityLatitude(destinationCity);
        double destLng = getCityLongitude(destinationCity);

        // 2. calculate distance between cities in km
        double distance = calculateDistance(sourceLat, sourceLng, destLat, destLng);

        // 3. update progress += previousProgress + 1000 / distance
        int updatedProgress = previousProgress + calculateProgressStep(distance);

        return Math.min(updatedProgress, 100);
    }

    private double getCityLatitude(String cityName) {
        return "Kyiv City".equals(cityName) ? 50.584981 : 49.85;
    }

    private double getCityLongitude(String cityName) {
        return "Kyiv City".equals(cityName) ? 30.235748 : 24.0166667;
    }

    // Haversine formula for distance calculation
    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        // Earth radius in kilometers
        final double R = 6371.0;

        // Convert latitude and longitude from degrees to radians
        double lat1Rad = Math.toRadians(lat1);
        double lon1Rad = Math.toRadians(lon1);
        double lat2Rad = Math.toRadians(lat2);
        double lon2Rad = Math.toRadians(lon2);

        // Calculate differences of latitudes and longitudes
        double latDiff = lat2Rad - lat1Rad;
        double lonDiff = lon2Rad - lon1Rad;

        // Calculate Haversine formula
        double a = Math.pow(Math.sin(latDiff / 2), 2)
                + Math.cos(lat1Rad) * Math.cos(lat2Rad)
                * Math.pow(Math.sin(lonDiff / 2), 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        // Calculate distance
        double distance = R * c;

        return distance;
    }

    private int calculateProgressStep(double distance) {
        // Adjust step inversely proportional to distance
        return Math.max((int) (1000 / distance), 1);
    }
    private Status calculateStatus(Integer progress) {
        return progress < 100 ? Status.IN_TRANSIT : Status.DELIVERED;
    }
}

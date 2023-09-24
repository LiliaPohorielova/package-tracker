package com.tracker.parcel.service;

import com.tracker.parcel.model.response.DeliveryResponse;

public interface DeliveryService {

    DeliveryResponse getDeliveryById(Long id);

}

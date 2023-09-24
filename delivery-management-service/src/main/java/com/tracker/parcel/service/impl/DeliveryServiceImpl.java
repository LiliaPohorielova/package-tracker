package com.tracker.parcel.service.impl;

import com.tracker.parcel.model.response.DeliveryResponse;
import com.tracker.parcel.service.DeliveryService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class DeliveryServiceImpl implements DeliveryService {

    @Override
    public DeliveryResponse getDeliveryById(Long id) {
        return null;
    }
}

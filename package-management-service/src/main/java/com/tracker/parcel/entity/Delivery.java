package com.tracker.parcel.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class Delivery {

    private Long id;
    private String title;
    private String sourceCity;
    private String destinationCity;
    private Integer progress;
    private Status status;
}

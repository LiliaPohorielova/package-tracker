package com.tracker.parcel.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Sender {
    private String firstname;
    private String lastname;
    private String phoneNumber;
}

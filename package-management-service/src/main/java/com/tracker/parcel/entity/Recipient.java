package com.tracker.parcel.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Recipient {
    //TODO: CREATE TABLE & EXTEND FROM USER CLASS
    //TODO: NOSQL AND MONGO DB
    private String firstname;
    private String lastname;
    private String phoneNumber;
}

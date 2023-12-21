package com.tracker.parcel.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class Notification {

    private Long id;
    private String subject;
    private String message;
    private String email;
    private String recipient;
    private String packageTitle;
}

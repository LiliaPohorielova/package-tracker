package com.tracker.parcel.entity;

import lombok.Data;

@Data
public class Notification {

    private Long id;
    private String subject;
    private String message;
    private String email;
    private String recipient;
    private String packageTitle;
}

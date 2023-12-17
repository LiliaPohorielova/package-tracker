package com.tracker.parcel.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "packages")
public class Package {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String source;
    private String destination;
    private String status;
    private String progress;
    private String budget;
    private String image;
    private String dateOfDispatch;
    private String dateOfReceipt;
    private String firstnameRecipient;
    private String lastnameRecipient;
    private String phoneNumberRecipient;
    private String firstnameSender;
    private String lastnameSender;
    private String phoneNumberSender;
}

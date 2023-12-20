package com.tracker.parcel.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "packages")
public class Package {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String sourceRegion;
    private String sourceCity;
    private String sourcePostalBranch;
    private String destinationRegion;
    private String destinationCity;
    private String destinationPostalBranch;
    private String budget;
    private String image;
    private String dateOfDispatch;
    private String dateOfReceipt;
    private String recipientSurname;
    private String recipientName;
    private String recipientPhoneNumber;
    private String recipientEmail;
    private String senderSurname;
    private String senderName;
    private String senderPhoneNumber;
    private String senderEmail;
    private Status status;
    private Integer progress;
}

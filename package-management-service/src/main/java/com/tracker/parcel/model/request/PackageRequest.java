package com.tracker.parcel.model.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class PackageRequest {

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
    private String status;
    private Integer progress;
}

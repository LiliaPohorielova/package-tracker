package com.tracker.parcel.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException() {
        super("Resource not found");
    }

    public ResourceNotFoundException(String resource) {
        super(String.format("%s not found", resource));
    }

    public ResourceNotFoundException(String typeOfResource, String resource) {
        super(String.format("%s with id: %s not found", typeOfResource, resource));
    }
}

package com.angellos.payment.dto;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.ZonedDateTime;

public record ResponseRecord(
        String message,
        int statusCode,
        Object data,
        ZonedDateTime dateTime
) {
    /**
     * This method is used to transform a ResponseRecord to a ResponseEntity<ResponseRecord>
     * @return ResponseEntity<ResponseRecord>
     * @author Prince Ah
     * @createdAt 9th May 2024
     */
    public ResponseEntity<ResponseRecord> toResponseEntity(){
        return new ResponseEntity<>(this, HttpStatus.valueOf(this.statusCode));
    }

}

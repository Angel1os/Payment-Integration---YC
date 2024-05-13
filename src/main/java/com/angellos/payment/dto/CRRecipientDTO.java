package com.angellos.payment.dto;

import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
public class CRRecipientDTO {

    private String name;

    private String country;

    private String address;

    private String dob;

    @Email
    private String email;

    private String idNumber;

    private String idType;

    private String phone;

    private String businessId;

    private String businessName;

}

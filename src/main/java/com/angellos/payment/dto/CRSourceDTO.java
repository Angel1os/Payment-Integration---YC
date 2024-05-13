package com.angellos.payment.dto;

import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
public class CRSourceDTO {

    private String accountType;

    private String accountNumber;

    private String networkId;


}

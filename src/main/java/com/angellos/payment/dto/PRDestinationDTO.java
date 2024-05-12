package com.angellos.payment.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class PRDestinationDTO {

    @NotBlank
    private String accountNumber;

    @NotBlank
    private String accountType;

    @NotBlank
    private String networkId;

    private String accountBank;

    private String networkName;

    private String country;

    @NotBlank
    private String accountName;

    private String phoneNumber;

}

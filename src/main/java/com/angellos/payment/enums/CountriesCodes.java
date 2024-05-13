package com.angellos.payment.enums;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public enum CountriesCodes {
    GHANA("GH"),
    USA("USA"),
    NIGERIA("NG"),
    CAMEROON("CM");



    private final String representation;
    CountriesCodes(String representation) {
        this.representation = representation;
    }

    public String getRepresentation() {
        return representation;
    }

    public static Map<String,String> getKeyValues() {
        Map<String,String> pairs = new HashMap<>();
        List<String> representations = new ArrayList<>();
        for (CountriesCodes codes : CountriesCodes.values()) {
            representations.add(codes.getRepresentation());
            pairs.put(String.valueOf(codes),String.valueOf(codes.getRepresentation()));
        }
        return pairs;
    }

    private static final Map<String, CountriesCodes> REPRESENTATION_MAP = new HashMap<>();

    static {
        for (CountriesCodes structure : CountriesCodes.values()) {
            REPRESENTATION_MAP.put(structure.getRepresentation().toUpperCase(), structure);
        }
    }

    public static CountriesCodes valueOfRepresentation(String representation) {
        return REPRESENTATION_MAP.get(representation.toUpperCase());
    }
}

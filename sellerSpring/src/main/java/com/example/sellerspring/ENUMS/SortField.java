package com.example.sellerspring.ENUMS;

public enum SortField {
    PRICE("price"),
    PRODUCT_NAME("productName"),
    CREATED_AT("createdAt");

    private final String field;

    SortField(String field) {
        this.field = field;
    }

    public String getField() {
        return field;
    }

    public static SortField fromString(String value) {
        for (SortField field : values()) {
            if (field.getField().equalsIgnoreCase(value)) {
                return field;
            }
        }
        throw new IllegalArgumentException("Unknown sort field: " + value);
    }
}

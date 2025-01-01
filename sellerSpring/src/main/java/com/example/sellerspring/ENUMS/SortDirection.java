package com.example.sellerspring.ENUMS;

public enum SortDirection {

    ASCENDING("ascending"),
    DESCENDING("descending");

    private final String direction;

    SortDirection(String direction) {
        this.direction = direction;
    }

    public String getDirection() {
        return direction;
    }

    public static SortDirection fromString(String value) {
        for (SortDirection direction : values()) {
            if (direction.getDirection().equalsIgnoreCase(value)) {
                return direction;
            }
        }
        throw new IllegalArgumentException("Unknown sort direction: " + value);
    }
}

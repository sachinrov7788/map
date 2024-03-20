package com.example.chart.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "users")
@Data
@Builder
public class User {
    @Id
    private String _id;
    private String name;
    private String email;
    private Date registration_date;
    private String district;
    private Double latitude;
    private Double longitude;
}

package com.rakathon.finaitic.dao;

import com.opencsv.bean.CsvBindByName;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class CsvMapper {
    @CsvBindByName(column = "TRANSACTION DETAILS")
    private String details;
    @CsvBindByName(column = "WITHDRAWAL AMT")
    private String withdrawal;
    @CsvBindByName(column = "DEPOSIT AMT")
    private String deposit;
    @CsvBindByName(column = "BALANCE AMT")
    private String balance;
    @CsvBindByName(column = "DATE")
    private String strdate;
}

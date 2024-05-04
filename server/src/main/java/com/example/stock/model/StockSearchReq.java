package com.example.stock.model;

import java.util.List;

import lombok.Data;

@Data
public class StockSearchReq {
    private List<String> ids;
}

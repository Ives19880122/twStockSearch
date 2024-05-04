package com.example.stock.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.stock.model.StockSearchReq;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RequestMapping("stock")
@RestController
public class StockController {

    public StockController(RestTemplate client){
        this.client = client;
    }

    private RestTemplate client;

    @PostMapping(value="realtime",
        consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    public String realTimeStock(@RequestBody StockSearchReq params){
        List<String> list = params.getIds();
        String result = "";
        if(list!=null && !list.isEmpty()){
            String param = list.stream().map(d->String.format("tse_%s.tw", d)).collect(Collectors.joining("|"));
            String url = String.format("https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=%s&json=1&delay=0&_=%d",param,Instant.now().toEpochMilli());
            result = client.getForObject(url, String.class);
        }
        return result;
    }
    
}

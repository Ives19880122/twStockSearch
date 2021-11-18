const express = require('express')
const axios = require('axios')
const app = express()

app.listen(9453,function(){
    console.log('server start on localhost:9453')
})

app.get('/',function(req,res){
    res.send("<h2>Welcome to Ives's stock server!!</h2>")
})

app.post('/stock/realtime/:id', async (req,res)=>{
    const url = `https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_${req.params.id}.tw&json=1&delay=0`
    const {data} = await axios.get(url)
    res.send(data)
})


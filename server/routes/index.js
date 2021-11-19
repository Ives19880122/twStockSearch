var express = require('express');
const axios = require('axios')
const router = express.Router();

/* GET users listing. */
// router.get('/api', function (req, res) {
//     res.send("<h2>Welcome to Ives's stock server!!</h2>")
// })

router.post('/stock/realtime/:id', async (req, res) => {
    try {
        const url = `https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_${req.params.id}.tw&json=1&delay=0`
        const { data } = await axios.get(url)
        res.send(data)
    } catch (e) {
        console.log(`connect error: ${currentTime()}`)
        res.send({ msgArray: [] })
    }
})


const currentTime = () => {
    const d = new Date();
    return `${[d.getFullYear(), d.getMonth() + 1, d.getDate()].join('/')} ${[d.getHours(), d.getMinutes(), d.getSeconds()].join(':')}`
}

module.exports = router;
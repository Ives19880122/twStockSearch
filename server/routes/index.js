var express = require('express');
const axios = require('axios')
const router = express.Router();

/* GET users listing. */
// router.get('/api', function (req, res) {
//     res.send("<h2>Welcome to Ives's stock server!!</h2>")
// })

// for vue Dev or Build
const pathDev = '/api'
const pathBuild = ''

router.post(`${pathDev}/stock/realtime`, async (req, res) => {
    try {
        const {ids} = req.body 
        const param = ids.map(d=>`tse_${d}.tw`).join('|')
        const url = `https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=${param}&json=1&delay=0`
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
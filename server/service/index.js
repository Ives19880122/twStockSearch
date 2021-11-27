const sql = require('mssql')
const config = require('./settings.json')

const connect = async() => {
    const pool = await sql.connect(config)
    return pool 
}

const twStockMapper = {
    getAll: `select
        concat('{',
            stuff((select 
                ',"'+id+'":"'+title+'"'
                from twStocks
                for Xml path('')
            ),1,1,'')
        ,'}') resultJSON
    `,
    // 取出resultSet資料
    getAllModel: (data) => {
        const {recordsets} = data
        const [[{resultJSON}]] = recordsets
        return resultJSON
    }
}

const twstockSevice = {
    getAll : async() => {
        try {
            const {getAll, getAllModel} = twStockMapper
            // 連線
            const pool = await connect()
            // sql請求串出json格式資料
            const result = await pool.request().query(getAll)
            return getAllModel(result)
        } catch (err) {
            console.log(err)
            // ... error checks
        }       
    }
}

module.exports = twstockSevice 
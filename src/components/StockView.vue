<template>
  <div>
    <h2>{{ msg }}</h2>
    <a-select
      v-model:value="selectedId"
      show-search
      placeholder="input search text"
      style="min-width: 80%"
      :filterOption="filter"
      mode='multiple'
      :maxTagCount='8'
    >
      <a-select-option
        v-for="([k, v], idx) in Object.entries(stocks)"
        :key="idx"
        :title="v"
        :value="k"
      >
        {{ `${k} ${v}` }}
      </a-select-option>
    </a-select>
    <a-button type="primary" @click="getStock" :disabled="disabled">{{
      "Search"
    }}</a-button>
    <template v-if="result.length>0">
      <a-table 
        :columns="columns" 
        :data-source="result" 
        :pagination="{current:page ,pageSize:5 , onChange:changePage}"
      />
    </template>
  </div>
  
</template>

<script>
import stocks from '@/assets/twStocks.json'
import axios from 'axios'

export default {
  name: 'StockSelect',
  props: {
    msg: String
  },
  data() {
    return {
      stocks,
      selectedId: [],
      disabled: false,
      result : [],
      columns: [
        {title:'代碼',dataIndex:'id'},
        {title:'股票名稱',dataIndex:'name'}, 
        {title:'成交價',dataIndex:'trade'}, 
        {title:'開盤',dataIndex:'open'}, 
        {title:'最高',dataIndex:'high'}, 
        {title:'最低',dataIndex:'low'}
      ],
      page:1
    }
  },
  methods: {
    changePage(page){
      this.page = page
    },
    filter(input, option) {
      return option.title.includes(input) || option.value.includes(input)
    },
    async getStock() {
      if (this.selectedId.length > 0) {
        if (!this.disabled) {
          this.disabled = true
          await this.connectTwse()
          await new Promise(resolve => setTimeout(resolve, 5000));
          this.disabled = false
        }
      }else{
        this.result = []
      }
    },
    async connectTwse() {
      // judgement is dev or production
      const path = {false:'/api',true:''}[process.env.NODE_ENV === 'production']
      const { data } = await axios.post(`${path}/stock/realtime`,{ids:this.selectedId})
      const toZero2 = (val)=> {
        const compute = Math.floor(val * 100) / 100
        return isNaN(compute) ? '' : compute
      }
      if (data.msgArray.length > 0) {
        this.result = data.msgArray.map(({ c:id, o: open, n: name, z: trade, h: high, l: low },i)=> {
          return {
            id:id,
            name:name,
            trade:toZero2(trade),
            open:toZero2(open),
            high:toZero2(high),
            low:toZero2(low),
            key:i
          }
        })
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

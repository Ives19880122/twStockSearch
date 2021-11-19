<template>
  <div>
    <h2>{{ msg }}</h2>
    <a-select
      show-search
      placeholder="input search text"
      style="min-width: 20em"
      @change="selected"
      :filterOption="filter"
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
      selectedId: '',
      disabled: false
    }
  },
  emits: ['selectedId'],
  methods: {
    filter(input, option) {
      return option.title.includes(input) || option.value.includes(input)
    },
    selected(val) {
      this.selectedId = val
    },
    async getStock() {
      if (this.selected != '') {
        if (!this.disabled) {
          this.disabled = true
          await this.connectTwse()
          await new Promise(resolve => setTimeout(resolve, 5000));
          this.disabled = false
        }
      }
    },
    async connectTwse() {
      const key = this.selectedId
      const { data } = await axios.post(`/api/stock/realtime/${key}`)
      if (data.msgArray.length > 0) {
        const [{ o: open, n: name, z: trade, h: high, l: low }] = data.msgArray
        const result = [
          `${key} ${name}`,
          `成交價 ${trade}`,
          `開盤 ${open}`,
          `最高 ${high}`,
          `最低 ${low}`
        ]
        console.log(result)
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

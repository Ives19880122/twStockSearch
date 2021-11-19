<template>
  <a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
      </a-menu>
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
        <StockView msg="Welcome to Ives's Stock Search App" />
      </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }">
      Ives ©2021.11.20
    </a-layout-footer>
  </a-layout>
</template>

<script>
import StockView from '@/components/StockView.vue'

export default {
  name: 'App',
  components: {
    StockView
  },
  methods: {

  },
}
</script>

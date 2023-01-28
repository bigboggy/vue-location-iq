<script setup>
import VueLocationIQ from './components/VueLocationIQ.vue'
import { ref } from 'vue'
const apiKey = import.meta.env.VITE_LOCATION_IQ_KEY
const searchPrompt = ref('')
</script>

<template>
  <div class="demo-page">
    <h1>VueLocationIQ Demo</h1>
    <VueLocationIQ :api-key="apiKey" v-model="searchPrompt" />
  </div>
</template>

<style>
body,
html {
  font-family: 'Arial', sans-serif;
  font-size: 14px;
  margin: 0;
  padding: 0;
}

.demo-page {
  padding: 16px;
}

/* media query for tablet and up */
@media (min-width: 768px) {
  .demo-page {
    max-width: 768px;
    margin: 0 auto;
  }
}
</style>

<script setup>
import GeoAutoComplete from './components/GeoAutoComplete.vue'
import { ref } from 'vue'
const apiKey = import.meta.env.VITE_LOCATION_IQ_KEY
const searchPrompt = ref('')
</script>

<template>
  <div class="form-wrapper">
    <GeoAutoComplete :api-key="apiKey" v-model="searchPrompt" />
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

.form-wrapper {
  padding: 16px;
}
</style>

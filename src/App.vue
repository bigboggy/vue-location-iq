<template>
  <GeoAutoComplete :api-key="apiKey" v-model="searchPrompt" @change="handleChange" />
</template>

<style></style>
<script setup>
import GeoAutoComplete from './components/GeoAutoComplete.vue'
import { ref } from 'vue'
const apiKey = import.meta.env.VITE_LOCATION_IQ_KEY
const searchPrompt = ref('')
const handleChange = (event) => {
  console.log(event.target.value)
}
</script>

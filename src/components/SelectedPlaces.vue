<template>
  <ul>
    <li v-for="(selectedPlace, index) of selectedPlaces" :key="index">
      <strong>{{ selectedPlace.address.name }}</strong>
      <p>{{ selectedPlace.address ? formatAddress(selectedPlace.address) : '' }}</p>
    </li>
  </ul>
</template>

<script setup>
import { formatAddress } from '../helpers/addressHelper.js'
defineProps(['selectedPlaces'])
</script>

<style scoped>
.selected-places {
  margin-top: 15px;
  background-color: #ffffff;
  border: 1px solid #edf2f7;
  border-radius: 0.375rem;
  padding: 0;
}

.selected-places li {
  color: #2d3748;
  padding: 15px;
  font-size: 16px;
  border-bottom: 1px solid #e2e8f0;
  list-style-type: none;
}

.selected-places p {
  padding: 10px 0 0 0;
  margin: 0;
}
</style>

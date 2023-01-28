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
.selected-elements {
  margin-top: 15px;
  background-color: #FFFFFF;
  border: 1px solid #EDF2F7;
  border-radius: 0.375rem;
  padding: 0;
}

.selected-elements li {
  color: #2D3748;
  padding: 15px;
  font-size: 16px;
  border-bottom: 1px solid #e2e8f0;
  list-style-type: none;
}

.selected-elements p {
  padding: 10px 0 0 0;
  margin: 0;
}
</style>

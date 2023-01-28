<template>
  <ul>
    <li v-for="(place, index) of places" :key="index" :class="{ selected: isSelected(index) }" @click="emit('select', index)">
      <strong>{{ place.address?.name }}</strong>
      <p>
        {{ place.address ? formatAddress(place.address) : '' }}
      </p>
    </li>
  </ul>
</template>

<script setup>
import { formatAddress } from '../helpers/addressHelper.js'

const props = defineProps(['places', 'selectedPlaceIndex'])
const emit = defineEmits(['select'])
const isSelected = (index) => {
  return props.selectedPlaceIndex === index
}
</script>

<style>
.search-field__auto-suggest {
  margin-top: 0;
  background-color: #FFFFFF;
  border: 1px solid #EDF2F7;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  padding: 0;
}

.search-field__auto-suggest li {
  color: #2D3748;
  padding: 15px;
  font-size: 16px;
  border-bottom: 1px solid #e2e8f0;
  list-style-type: none;
  transition: all 0.2s ease;
}

.search-field__auto-suggest li:hover {
  background-color: #f7fafc;
  cursor: pointer;
}

.search-field__auto-suggest li.selected {
  background-color: #2d3748;
  color: white;
}

.search-field__auto-suggest li p {
  margin: 0;
  padding-top: 10px;
}

</style>

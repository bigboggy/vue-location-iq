<template>
  <ul>
    <li
      v-for="(place, index) of places"
      :key="index"
      :class="{ selected: isSelected(index) }"
      @click="emit('select', index)"
    >
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
const emit = defineEmits(['select', 'arrowUp', 'arrowDown', 'enter'])

const onKeyDown = (event) => {
  if (event.key === 'ArrowUp') {
    emit('arrowUp')
  }

  if (event.key === 'ArrowDown') {
    emit('arrowDown')
  }

  if (event.key === 'Enter') {
    emit('enter')
  }
}

window.addEventListener('keydown', onKeyDown)

const isSelected = (index) => {
  return props.selectedPlaceIndex === index
}
</script>

<style>
.search-field__auto-suggest {
  margin-top: 0;
  background-color: #ffffff;
  border: 1px solid #edf2f7;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  padding: 0;
  position: absolute;
  width: 100%;
}

.search-field__auto-suggest li {
  color: #2d3748;
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

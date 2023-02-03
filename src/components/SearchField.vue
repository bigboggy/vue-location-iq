<template>
  <input
    ref="searchField"
    type="text"
    :class="[{ 'has-error': error }]"
    :value="searchQuery"
    :placeholder="placeholder"
    @keydown.down="handleListFocus"
  />
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps(['searchQuery', 'hasPlaces', 'placeholder', 'error'])
const searchField = ref()
const handleListFocus = () => {
  if (props.hasPlaces) searchField.value.blur()
}
</script>

<style scoped>
.search-field__input {
  background-color: #f7fafc;
  border: 1px solid #edf2f7;
  color: #2d3748;
  border-radius: 0.25rem;
  outline: none;
  display: block;
  width: 100%;
  padding: 0.625rem;
  box-sizing: border-box;
  font-size: 18px;
  transition: all 0.2s ease;
}

.search-field__input:focus {
  border-color: #4299e1;
}

.search-field__input.has-error {
  border: 1px solid #e02424;
  color: #e02424;
}
</style>

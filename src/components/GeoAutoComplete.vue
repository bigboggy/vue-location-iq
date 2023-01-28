<script lang="ts" setup>
import { computed, Ref, ref, watch } from 'vue'
import { useDebouncedRef } from '../composables/useDebounceRef.ts'
import { useGeoAutoCompleteInput } from '../composables/useGeoAutoCompleteInput.ts'
import { Place } from '../interfaces/Place'

const props = defineProps(['modelValue', 'apiKey'])
const emit = defineEmits(['update:modelValue', 'change'])
const input = useGeoAutoCompleteInput(props.apiKey, import.meta.env.VITE_LOCATION_IQ_API_URL)
const places: Ref<Place[]> = ref(null)

const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const debouncedInputValue = useDebouncedRef(null)

watch(debouncedInputValue, async (value) => {
  places.value = await input.getGeoAutoComplete(value)
})

const handleInput = (event) => {
  inputValue.value = event.target.value
  debouncedInputValue.value = event.target.value
}

const handleChange = (event) => {
  emit('change', event)
}
</script>

<template>
  <input type="text" @input="handleInput" @change="handleChange" />
  <ul>
    <li v-for="place of places">{{ place.address }}</li>
  </ul>
</template>

<style scoped></style>

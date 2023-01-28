<script lang="ts" setup>
import { computed, Ref, ref, watch } from 'vue'
import { useDebouncedRef } from '../composables/useDebounceRef'
import { useGeoAutoCompleteApi } from '../composables/useGeoAutoCompleteInput'
import { Place } from '../interfaces/Place'
import Dropdown from './Dropdown.vue'
import { useAutocomplete } from '../composables/useAutocomplete'
import SelectedPlaces from './SelectedPlaces.vue'
import SearchField from './SearchField.vue'
import ErrorMessage from './ErrorMessage.vue'
import SearchFieldWrapper from './SearchFieldWrapper.vue'

const props = defineProps([
  'modelValue',
  'apiKey',
  'existingLocations',
  'placeholder',
  'searchFieldClass',
  'dropDownClass',
  'selectedElementsClass',
])

const emit = defineEmits(['update:modelValue', 'change'])

const autoCompleteApi = useGeoAutoCompleteApi(props.apiKey)
const places: Ref<Place[] | string> = ref(null)
const selectedPlaceIndex: Ref<number> = ref(0)
const selectedPlaces: Ref<Place[]> = ref(props.existingLocations || [])

// allowing to bind with v-model to the input from parent
const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const autoComplete = useAutocomplete(places, selectedPlaceIndex, selectedPlaces, inputValue)

window.addEventListener('keydown', autoComplete.onKeyDown)

// debounce ref used for delayed input, to prevent excessive API calls
const debouncedInputValue = useDebouncedRef(null)

const error: Ref<string> = ref('')

const handlePlacesResponse = () => {
  if (!places.value.length) {
    error.value = places.value.toString()
  } else {
    selectedPlaceIndex.value = 0
    error.value = ''
  }
}

watch(debouncedInputValue, async (value) => {
  places.value = await autoCompleteApi.getGeoAutoComplete(value)
  handlePlacesResponse()
})

const handleInput = (event) => {
  inputValue.value = event.target.value
  debouncedInputValue.value = event.target.value
}

const handleChange = (event) => emit('change', event)
</script>

<template>
  <SearchFieldWrapper>
    <SearchField
      :class="searchFieldClass ? searchFieldClass : 'search-field__input'"
      :input-value="inputValue"
      :placeholder="placeholder"
      :error="error"
      :places="places"
      @input="handleInput"
      @change="handleChange"
    />
    <ErrorMessage v-if="error" :error="error" />
    <Dropdown
      v-if="inputValue && places?.length"
      :class="dropDownClass ? dropDownClass : 'search-field__auto-suggest'"
      :places="places"
      :selectedPlaceIndex="selectedPlaceIndex"
    />
    <SelectedPlaces
      v-if="selectedPlaces.length"
      :class="selectedElementsClass ? selectedElementsClass : 'selected-elements'"
      :selected-places="selectedPlaces"
    />
  </SearchFieldWrapper>
</template>

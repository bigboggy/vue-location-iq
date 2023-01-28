<script lang="ts" setup>
import { computed, PropType, Ref, ref, watch } from 'vue'
import { useDebouncedRef } from '../composables/useDebounceRef'
import { useGeoAutoCompleteApi } from '../composables/useGeoAutoCompleteInput'
import { Place } from '../interfaces/Place'
import Dropdown from './Dropdown.vue'
import { useKeyboard } from '../composables/useKeyboard'
import SelectedPlaces from './SelectedPlaces.vue'
import SearchField from './SearchField.vue'
import ErrorMessage from './ErrorMessage.vue'
import SearchFieldWrapper from './SearchFieldWrapper.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
    required: false,
  },
  apiKey: {
    type: String,
    required: true,
  },
  existingLocations: Array as PropType<Place[]>,
  placeholder: {
    type: String,
    default: 'Search for a location',
  },
  searchFieldClass: String,
  dropDownClass: String,
  selectedElementsClass: String,
})

const emit = defineEmits(['update:modelValue', 'change'])

const autoCompleteApi = useGeoAutoCompleteApi(props.apiKey)
const places: Ref<Place[] | string> = ref(null)
const selectedPlaceIndex: Ref<number> = ref(0)
const selectedPlaces = ref(props.existingLocations || [])

// Input handling
const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const handleInput = (event) => {
  inputValue.value = event.target.value
  debouncedInputValue.value = event.target.value
}

const handleChange = (event) => emit('change', event)

// Event handling
const handleSearchReset = () => {
  selectedPlaceIndex.value = null
  inputValue.value = ''
  places.value = null
}

const isPlaceDuplicate = () => {
  const currentPlace: Place = places.value[selectedPlaceIndex.value]
  const placeInSelection: boolean = selectedPlaces.value.some(
    (selectedPlace) => selectedPlace.place_id === currentPlace.place_id
  )
  return placeInSelection
}

const handlePlaceSelect = (index) => {
  if (isPlaceDuplicate()) {
    return
  }

  selectedPlaces.value.push(places.value[index])

  handleSearchReset()
}

const keyboard = useKeyboard(places, selectedPlaceIndex, handleSearchReset, handlePlaceSelect)

window.addEventListener('keydown', keyboard.onKeyDown)

// Error handling
const error: Ref<string> = ref('')

const handlePlacesResponse = async (value) => {

  if (inputValue.value === '' || value.length < 3) {
    return false
  }

  try {
    places.value = await autoCompleteApi.getGeoAutoComplete(value)
    error.value = ''
    selectedPlaceIndex.value = 0
  } catch (e) {
    error.value = e.message
    selectedPlaceIndex.value = 0
  }
}

// debounce ref used for delayed input, to prevent excessive API calls
const debouncedInputValue = useDebouncedRef(null)

watch(debouncedInputValue,(value) => {
  handlePlacesResponse(value)
})
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
      v-if="inputValue && places?.length && !error"
      :class="dropDownClass ? dropDownClass : 'search-field__auto-suggest'"
      :places="places"
      :selectedPlaceIndex="selectedPlaceIndex"
      @select="handlePlaceSelect($event)"
    />
    <SelectedPlaces
      v-if="selectedPlaces.length"
      :class="selectedElementsClass ? selectedElementsClass : 'selected-elements'"
      :selected-places="selectedPlaces"
    />
  </SearchFieldWrapper>
</template>

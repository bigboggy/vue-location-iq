<script lang="ts" setup>
import { computed, onMounted, PropType, watch } from 'vue'
import { useDebouncedRef } from '../composables/useDebounceRef'
import { useGeoAutoCompleteApi } from '../composables/useGeoAutoCompleteApi'
import { Place } from '../interfaces/Place'
import Dropdown from './Dropdown.vue'
import SelectedPlaces from './SelectedPlaces.vue'
import SearchField from './SearchField.vue'
import ErrorMessage from './ErrorMessage.vue'
import SearchFieldWrapper from './SearchFieldWrapper.vue'
import { useSelectedPlacesStore } from '../stores/selectedPlaces'
import { placeSuggestionStore } from '../stores/placeSuggestions'
import { useErrorStore } from '../stores/error'
import { usePlaces } from '../composables/usePlaces'

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
  existingLocations: {
    type: Array as PropType<Place[]>,
    default: () => [],
    required: false,
  },
  placeholder: {
    type: String,
    default: 'Search for a location',
  },
  searchFieldClass: {
    type: String,
    default: 'search-field__input',
  },
  dropDownClass: {
    type: String,
    default: 'search-field__auto-suggest',
  },
  selectedElementsClass: {
    type: String,
    default: 'selected-places',
  },
  hideSelectedPlaces: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'change', 'selectedPlacesUpdated'])

const selectedPlaces = useSelectedPlacesStore()
const error = useErrorStore()
const autoCompleteApi = useGeoAutoCompleteApi(props.apiKey)
const placeSuggestions = placeSuggestionStore()
const places = usePlaces(autoCompleteApi, placeSuggestions, error)

// debounce ref used for delayed input, to prevent excessive API calls
const debouncedInputValue = useDebouncedRef(null)

// Setting initial value
onMounted(() => {
  selectedPlaces.setItems(props.existingLocations)
})

// watch for changes in the search query, handle the API call and clear selection
watch(debouncedInputValue, (value) => {
  places.handlePlacesResponse(value)
  placeSuggestions.clearSelectedIndex()
})

// Send updates to parent, if new places are selected
watch(selectedPlaces.getItems(), (value) => {
  emit('selectedPlacesUpdated', value)
})

// Handles 2 way binding for the search field
const searchQuery = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

// Computed properties
const canShowDropdown = computed(() => {
  return searchQuery.value.length > 0 && placeSuggestions.hasItems() && !error.hasErrorMessage()
})

const canShowSelectedPlaces = computed(() => {
  return !props.hideSelectedPlaces && selectedPlaces.hasItems()
})

/**
 * Handle change event, if search query input changes value
 * @param event
 */
const handleChange = (event) => emit('change', event)

/**
 * Realtime update for the search query, if bound by v-model & update debounced value
 * @param event
 */
const handleInput = (event) => {
  searchQuery.value = event.target.value
  debouncedInputValue.value = event.target.value
}

// Clear the search input field and reset the index
const handleSearchReset = () => {
  placeSuggestions.clearSelectedIndex()
  searchQuery.value = ''
  placeSuggestions.clearItems()
}

// Move up the dropdown list
const handleArrowUp = () => {
  placeSuggestions.decrementSelectedIndex()
}

// Move down the dropdown list
const handleArrowDown = () => {
  placeSuggestions.incrementSelectedIndex()
}

// Select a place from the dropdown by index
const handleEnter = () => {
  const selectedPlace = placeSuggestions.getItemByIndex()
  places.handlePlaceSelect(selectedPlace, selectedPlaces)
  handleSearchReset()
}
</script>

<template>
  <SearchFieldWrapper>
    <SearchField
      :class="searchFieldClass"
      :search-query="searchQuery"
      :placeholder="placeholder"
      :error="error.hasErrorMessage()"
      :has-places="placeSuggestions.hasItems()"
      @input="handleInput"
      @change="handleChange"
    />
    <ErrorMessage v-if="error.hasErrorMessage()" :error="error.getError()" />
    <Dropdown
      v-if="canShowDropdown"
      :class="dropDownClass"
      :places="placeSuggestions.getItems()"
      :selectedPlaceIndex="placeSuggestions.getSelectedIndex()"
      @arrow-down="handleArrowDown"
      @arrow-up="handleArrowUp"
      @enter="handleEnter"
    />
    <SelectedPlaces
      v-if="canShowSelectedPlaces"
      :class="selectedElementsClass"
      :selected-places="selectedPlaces.getItems()"
    />
  </SearchFieldWrapper>
</template>

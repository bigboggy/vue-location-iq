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
const errorStore = useErrorStore()
const autoCompleteApi = useGeoAutoCompleteApi(props.apiKey)

// Simple store for the place suggestions, no need for pinia here
const placeStore = placeSuggestionStore()

const places = usePlaces(autoCompleteApi, placeStore, errorStore)

// debounce ref used for delayed input, to prevent excessive API calls
const debouncedInputValue = useDebouncedRef(null)

// Setting initial value
onMounted(() => {
  selectedPlaces.setItems(props.existingLocations)
})

// watch for changes in the search query, handle the API call and clear selection
watch(debouncedInputValue, (value) => {
  places.handlePlacesResponse(value)
  placeStore.clearSelectedIndex()
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
  return searchQuery.value.length > 0 && placeStore.hasItems() && !errorStore.hasErrorMessage()
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
  placeStore.clearSelectedIndex()
  searchQuery.value = ''
  placeStore.clearItems()
}

// Move up the dropdown list
const handleArrowUp = () => {
  placeStore.decrementSelectedIndex()
}

// Move down the dropdown list
const handleArrowDown = () => {
  placeStore.incrementSelectedIndex()
}

// Select a place from the dropdown by index
const handleSelect = () => {
  const selectedPlace = placeStore.getItemByIndex()
  places.handlePlaceSelect(selectedPlace, selectedPlaces)
  emit('selectedPlacesUpdated', selectedPlaces.getItems())
  handleSearchReset()
}
</script>

<template>
  <SearchFieldWrapper>
    <SearchField
      :class="searchFieldClass"
      :search-query="searchQuery"
      :placeholder="placeholder"
      :error="errorStore.hasErrorMessage()"
      :has-places="placeStore.hasItems()"
      @input="handleInput"
      @change="handleChange"
    />
    <ErrorMessage v-if="errorStore.hasErrorMessage()" :error="errorStore.getError()" />
    <Dropdown
      v-if="canShowDropdown"
      :class="dropDownClass"
      :places="placeStore.getItems()"
      :selectedPlaceIndex="placeStore.getSelectedIndex()"
      @arrow-down="handleArrowDown"
      @arrow-up="handleArrowUp"
      @enter="handleSelect"
      @select="handleSelect"
    />
    <SelectedPlaces
      v-if="canShowSelectedPlaces"
      :class="selectedElementsClass"
      :selected-places="selectedPlaces.getItems()"
    />
  </SearchFieldWrapper>
</template>

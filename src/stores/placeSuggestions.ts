import { ref, Ref } from 'vue'
import { Place } from '../interfaces/Place'

export const placeSuggestionStore = () => {
  const items: Ref<Place[] | string> = ref([])
  const selectedIndex = ref(0)

  const setItems = (newPlaces: Place[] | string) => {
    items.value = newPlaces
  }

  const getItems = () => {
    return items.value
  }

  const clearItems = () => {
    items.value = []
  }

  const hasItems = () => {
    return items.value.length > 0
  }

  const setSelectedIndex = (index: number) => {
    selectedIndex.value = index
  }

  const getSelectedIndex = () => {
    return selectedIndex.value
  }

  const clearSelectedIndex = () => {
    selectedIndex.value = 0
  }

  const decrementSelectedIndex = () => {
    if (selectedIndex.value > 0) {
      selectedIndex.value--
    }
  }

  const incrementSelectedIndex = () => {
    selectedIndex.value++
  }

  const getItemByIndex = () => {
    return items.value[selectedIndex.value]
  }

  return {
    items,
    setItems,
    clearItems,
    hasItems,
    selectedIndex,
    setSelectedIndex,
    clearSelectedIndex,
    getSelectedIndex,
    getItems,
    decrementSelectedIndex,
    incrementSelectedIndex,
    getItemByIndex,
  }
}

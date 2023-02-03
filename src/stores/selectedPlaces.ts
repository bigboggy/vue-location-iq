import { Place } from '../interfaces/Place'
import { Ref, ref } from 'vue'

export const useSelectedPlacesStore = () => {
  const items: Ref<Place[]> = ref([])

  const addItems = (place: Place) => {
    items.value.push(place)
  }

  const setItems = (newPlaces: Place[]) => {
    items.value = newPlaces
  }

  const removeItems = (place: Place) => {
    const index = items.value.findIndex((p) => p.id === place.id)
    items.value.splice(index, 1)
  }

  const getItems = () => {
    return items.value
  }

  const hasItems = () => {
    return items.value.length > 0
  }

  return {
    items,
    addItems,
    setItems,
    removeItems,
    getItems,
    hasItems,
  }
}

import { Place } from '../interfaces/Place'

export const useAutocomplete = (places, selectedPlaceIndex, selectedPlaces, inputValue) => {
  /**
   * Handles key events
   * @param event
   */
  const onKeyDown = (event) => {
    if (places.value) {
      if (event.key === 'ArrowUp') {
        upHandler()
        return
      }

      if (event.key === 'ArrowDown') {
        downHandler()
        return
      }

      if (event.key === 'Enter') {
        enterHandler()
        return
      }
    }
  }

  /**
   * Handles key up
   */
  const upHandler = () => {
    if (selectedPlaceIndex.value > 0) {
      selectedPlaceIndex.value--
    }
  }

  /**
   * Handles key down
   */
  const downHandler = () => {
    if (selectedPlaceIndex.value < places.value.length - 1) {
      selectedPlaceIndex.value++
    }
  }

  /**
   * Handles enter, submits the selection and resets the search
   */
  const enterHandler = () => {
    const place: Place = places.value[selectedPlaceIndex.value]
    const placeInSelection: boolean = selectedPlaces.value.some(
      (selectedPlace) => selectedPlace.place_id === place.place_id
    )

    // Check if place is already in selectedPlaces.value
    if (placeInSelection) {
      return
    }

    selectedPlaces.value.push(places.value[selectedPlaceIndex.value])

    resetSearch()
  }

  /**
   * Reset selection and input field
   */
  const resetSearch = () => {
    selectedPlaceIndex.value = null
    inputValue.value = ''
    places.value = null
  }

  return {
    onKeyDown
  }
}

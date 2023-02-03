import { Place } from '../interfaces/Place'

export const usePlaces = (autoCompleteApi, placeSuggestions, error) => {
  const isPlaceDuplicate = (currentPlace, selectedPlaces) => {
    return selectedPlaces.items.value.some((selectedPlace) => selectedPlace.place_id === currentPlace.place_id)
  }

  const handlePlaceSelect = (currentPlace: Place, selectedPlaces) => {
    if (isPlaceDuplicate(currentPlace, selectedPlaces)) {
      return
    }

    selectedPlaces.addItems(currentPlace)
  }

  const handlePlacesResponse = async (value) => {
    if (value === '' || value.length < 3) {
      return
    }

    try {
      const suggestions = await autoCompleteApi.getGeoAutoComplete(value)
      placeSuggestions.setItems(suggestions)
      error.clearError()
    } catch (e) {
      error.setError(e.message)
    }
  }

  return {
    handlePlacesResponse,
    handlePlaceSelect,
  }
}

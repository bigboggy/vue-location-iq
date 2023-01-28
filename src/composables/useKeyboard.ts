export const useKeyboard = (places, selectedPlaceIndex, handleSearchReset, handlePlaceSelect) => {
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
        handlePlaceSelect(selectedPlaceIndex.value)
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

  return {
    onKeyDown
  }
}

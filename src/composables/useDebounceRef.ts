import { customRef } from 'vue'

/**
 * Debounce a ref value
 * @param value
 * @param delay
 */
export const useDebouncedRef = (value: any, delay: number = 200) => {
  let timeout: string | number | NodeJS.Timeout | undefined
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      },
    }
  })
}

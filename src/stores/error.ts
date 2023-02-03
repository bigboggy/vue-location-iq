import { ref, Ref } from 'vue'

export const useErrorStore = () => {
  const message: Ref<string> = ref('')

  const setError = (newError: string) => {
    message.value = newError
  }

  const getError = () => {
    return message.value
  }

  const clearError = () => {
    message.value = ''
  }

  const hasErrorMessage = () => {
    return message.value !== ''
  }

  return {
    message,
    setError,
    clearError,
    getError,
    hasErrorMessage
  }
}

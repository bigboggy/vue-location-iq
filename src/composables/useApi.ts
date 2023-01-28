export const useApi = () => {
  const baseUrl = 'https://api.locationiq.com/v1/autocomplete.php'

  const get = async (request: RequestInfo) => {
    const response = await fetch(`${baseUrl}${request}`)

    if (!response.ok) {
      throw new Error(`${response.statusText}`)
    }

    return await response.json()
  }

  return {
    get,
  }
}

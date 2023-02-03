import { Place } from '../interfaces/Place'
import { useApi } from './useApi'

export const useGeoAutoCompleteApi = (apiKey: string, limit: number = 5) => {
  const api = useApi()
  /**
   * Get places from locationIQ API
   * @param query
   */
  const getGeoAutoComplete: (query: string) => Promise<Place[] | string> = async (query: string) => {
    try {
      return await api.httpGet(`?key=${apiKey}&q=${query}&limit=${limit}`)
    } catch (e) {
      throw new Error(e)
    }
  }

  return {
    getGeoAutoComplete,
  }
}

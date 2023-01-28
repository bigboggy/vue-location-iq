import { Place } from '../interfaces/Place'
import { useApi } from './useApi'

export const useGeoAutoCompleteInput = (apiKey: string, baseUrl: string, limit: number = 5) => {
  const api = useApi(baseUrl)
  /**
   * Get places from locationIQ API
   * @param query
   */
  const getGeoAutoComplete: (query: string) => Promise<Place[]> = async (query: string) => {
    return await api.get<Place[]>(`?key=${apiKey}&q=${query}&limit=${limit}`)
  }

  return {
    getGeoAutoComplete,
  }
}

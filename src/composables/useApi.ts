export const useApi = (baseUrl) => {
  async function get<T>(request: RequestInfo): Promise<T> {
    const response = await fetch(`${baseUrl}${request}`)
    return await response.json()
  }

  return {
    get,
  }
}

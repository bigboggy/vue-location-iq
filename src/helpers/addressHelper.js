/**
 * Takes in all address elements, ignores name and country_code
 * and creates a comma seperated address string
 * @param address
 * @return {string}
 */
export const formatAddress = (address) => {
  const addressElements = []
  for (const [key, addressElement] of Object.entries(address)) {
    if (key !== 'name' && key !== 'country_code') {
      addressElements.push(addressElement)
    }
  }
  return addressElements.toString().replaceAll(',', ', ')
}

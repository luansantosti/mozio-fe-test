import { formattedCities } from "./cities";

export const getCities = (value: string) => {
  if (!value) {
    return []
  }

  const valueFormatted = value.toLowerCase()
  return formattedCities.filter(option => option.title.toLowerCase().includes(valueFormatted))
}

export const getCity = (value: string) => {
  if (!value) {
    return null
  }

  return formattedCities.find(city => city.title.toLowerCase() === value.toLowerCase())
}
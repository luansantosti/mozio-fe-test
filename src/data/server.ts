import { formattedCities } from "./cities";

export function getCities(value: string) {
  const valueFormatted = value.toLowerCase()
  return formattedCities.filter(option => option.title.toLowerCase().includes(valueFormatted))
}
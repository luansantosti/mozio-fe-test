import { formattedCities } from "./cities";

export interface City {
  title: string;
  lat: number;
  lon: number;
}

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

export const getCitiesFromParam = (cities: string) => {
  const citiesArray = cities.split(',')
  const citiesFormatted = citiesArray.map(city => getCity(city))

  return new Promise<(City | null | undefined)[]>((resolve, reject) => {
    setTimeout(() => {
      resolve(citiesFormatted)
    }, 1500)
  })
}

interface HaversineProps {
  cityA: City;
  cityB: City;
}

const haversine = ({ cityA, cityB }: HaversineProps) => {
  const dLat = (cityB.lat - cityA.lat) * Math.PI / 180.0
  const dLon = (cityB.lon - cityA.lon) * Math.PI / 180.0
  
  const lat1 = (cityA.lat) * Math.PI / 180.0
  const lat2 = (cityB.lat) * Math.PI / 180.0
  
  const a = Math.pow(Math.sin(dLat / 2), 2) +
      Math.pow(Math.sin(dLon / 2), 2) *
      Math.cos(lat1) *
      Math.cos(lat2)
  
  const rad = 6371
  const c = 2 * Math.asin(Math.sqrt(a))
  
  return parseFloat((rad * c).toFixed(2))
}

const CITY_EDGE_CASE = 'Dijon'

export const calculateRoute = (cities: City[]) => {
  const citiesWithDistances = cities.map((city, index) => {
    if (cities.length === index + 1) {
      return city
    }

    return {
      ...city,
      distanceToNext: haversine({
        cityA: city,
        cityB: cities[index + 1]
      })
    }
  })

  return new Promise<(City | null | undefined)[]>((resolve, reject) => {
    setTimeout(() => {
      // fake edge case
      const hasDijonIncluded = citiesWithDistances?.find(city => city.title === CITY_EDGE_CASE)

      if (hasDijonIncluded) {
        reject('Oops! Something went wrong!')
      } else {
        resolve(citiesWithDistances)
      }
    }, 1500)
  })
}


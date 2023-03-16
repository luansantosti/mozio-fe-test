import { getCity } from "../data/server";

interface City {
  title: string;
  lat: number;
  lon: number;
}

export const getCitiesFromParam = (cities: string) => {
  const citiesArray = cities.split(',')
  const citiesFormatted = citiesArray.map(city => getCity(city))

  return new Promise<(City | null | undefined)[]>((resolve, reject) => {
    setTimeout(() => {
      resolve(citiesFormatted)
    }, 1000)
  })
}
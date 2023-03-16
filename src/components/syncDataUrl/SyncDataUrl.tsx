import { format } from 'date-fns'
import { useEffect } from 'react'
import { FieldValues, useWatch } from "react-hook-form"
import { useSearchParams } from 'react-router-dom'

interface City {
  title: string;
  lat: number;
  lon: number;
}

const SyncDataUrl = () => {
  const data = useWatch()
  const [_, setParams] = useSearchParams()

  const handleUpdateUrl = (data: FieldValues) => {
    const { passengers, date, cities } = data

    const citiesFormatted = cities?.filter((city: City) => city.title).map((city: City) => city.title)

    
    const params = {
      passengers: passengers,
      date: format(date, 'MM-dd-yyyy'),
      ...citiesFormatted.length >= 2 ? { cities: citiesFormatted?.join(',') } : {}
    }

    setParams(params)
  }
  
  useEffect(() => {
    handleUpdateUrl(data)
  }, [data])
  
  return null
}

export default SyncDataUrl
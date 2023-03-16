import { Typography } from '@mui/material';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { calculateRoute, getCitiesFromParam } from "../../data/server";
import Loading from '../loading';
import RoutesTimeline from '../routesTimeline'

import * as S from './styles'

interface SearchResultsProps {
  params: {
    [k: string]: string;
  }
}

const Results = ({ params }: SearchResultsProps) => {
  const { passengers, cities, date } = params
  const [isLoading, setIsLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState('Calculating your route')
  const [error, setError] = useState('')
  const [routes, setRoutes] = useState([])

  const handleRoute = async (response: any) => {
    setLoadingMessage('Almost there...')

    try {
      const newRoutes: any = await calculateRoute(response)
      
      setRoutes(newRoutes)
    } catch(err) {
      // setError()
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const loadCities = async () => {
      try {
        const response: any = await getCitiesFromParam(cities)

        handleRoute(response)
      } catch (err) {
        // setError(err)
        setIsLoading(false)
      }
    }

    if (cities.length) {
      loadCities()
    }
  }, [])
  
  console.log('route', routes)

  if (isLoading) {
    return <Loading loadingMessage={loadingMessage} />
  }

  return (
    <S.Wrapper>
      <RoutesTimeline routes={routes} />

      <Typography><b>{passengers}</b> passengers</Typography>
      <Typography>{format(new Date(date), 'LLL dd, yyyy')}</Typography>
    </S.Wrapper>
  )
}

export default Results
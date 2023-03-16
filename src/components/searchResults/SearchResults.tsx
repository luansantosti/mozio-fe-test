import { Button, Typography } from '@mui/material';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate()

  const handleRoute = async (response: any) => {
    setLoadingMessage('Almost there...')

    try {
      const newRoutes: any = await calculateRoute(response)
      
      setRoutes(newRoutes)
    } catch(err: any) {
      setError(err)
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

    if (cities) {
      loadCities()
    } else {
      setIsLoading(false)
      setError('Oops! Something went wrong!')
    }
  }, [])
  

  if (isLoading) {
    return <Loading loadingMessage={loadingMessage} />
  }

  const totalDistance = routes?.reduce((acc, route: any) => {
    if (!route.distanceToNext) {
      return acc
    }

    return acc + route.distanceToNext
  }, 0)

  return (
    <S.Wrapper>
      {error || !routes?.length ? (
        <Typography fontWeight='bold'>{error}</Typography>  
      ) : (
        <>
          <RoutesTimeline routes={routes} />

          <Typography><b>{totalDistance} km</b> is total distance</Typography>
          <Typography><b>{passengers}</b> passengers</Typography>
          <Typography fontWeight='bold'>{format(new Date(date), 'LLL dd, yyyy')}</Typography>
        </>
      )}

      <Button variant='contained' onClick={() => navigate(-1)}>Back</Button>
    </S.Wrapper>
  )
}

export default Results
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { addDays, format, isValid as isDateValid } from 'date-fns'
import { useEffect, useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

import Loading from "../loading";
import QuantityInput from '../quantityInput'
import CitiesTimeline from '../citiesTimeline';
import * as S from './styles'
import DatePicker from "../datePicker";
import SyncDataUrl from "../syncDataUrl";
import { getCitiesFromParam } from "../../data/server";
import { emptyOption } from "../cityAutocomplete/CityAutocomplete";

interface City {
  title: string;
  lat: number;
  lon: number;
}

interface SearchFormProps {
  params: {
    [k: string]: string;
  }
}

const initialCities = [emptyOption, emptyOption]

const SearchForm = ({ params }: SearchFormProps) => {
  const { passengers, date, cities } = params
  const [isLoading, setIsLoading] = useState(!!cities?.length)
  const navigate = useNavigate()

  const methods = useForm({
    defaultValues: {
      cities: initialCities,
      passengers: passengers ? parseInt(passengers) : 1,
      date: date ? new Date(date) : addDays(new Date, 1)
    }
  });

  useEffect(() => {
    const loadCities = async () => {
      const response: any = await getCitiesFromParam(cities)
      const responseFormatted = response?.length === 1 ? [...response, emptyOption] : response

      methods.setValue('cities', responseFormatted)
      setIsLoading(false)
    }

    if (cities?.length) {
      loadCities()
    }
  }, [])

  if (isLoading) {
    return <Loading />
  }

  const onSubmit = (data: FieldValues) => {
    const { passengers, cities, date } = data

    const citiesFormatted = cities?.filter((city: City) => city.title).map((city: City) => city.title)
    
    navigate({
      pathname: '/result',
      search: createSearchParams({
        passengers,
        cities: citiesFormatted?.join(','),
        date: format(date, 'MM-dd-yyyy'),
      }).toString()
    })
  };

  const { formState: { isValid } } = methods

  return (
    <FormProvider {...methods}> 
      <S.FormWrapper onSubmit={methods.handleSubmit(onSubmit)}>
        <S.LeftWrapper>
          <CitiesTimeline />
        </S.LeftWrapper>

        <S.RightWrapper>
          <QuantityInput label='Passengers' name='passengers' />

          <DatePicker />
        </S.RightWrapper>

        <S.ButtonWrapper>
          <S.Button showAsDisabled={!isValid} type="submit" variant="contained">Submit</S.Button>
        </S.ButtonWrapper>
      </S.FormWrapper>
      <SyncDataUrl />
    </FormProvider>
  );
}

export default SearchForm
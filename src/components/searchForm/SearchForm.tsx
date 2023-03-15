import { Button } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";

import QuantityInput from '../quantityInput'
import CitiesTimeline from '../citiesTimeline';
import * as S from './styles'

const SearchForm = () => {
  const methods = useForm({
    defaultValues: {
      cities: [{ name: 'origin' }, { name: 'destination' }],
      passengers: 1
    }
  });

  const onSubmit = (data: any) => console.log('data', data);

  return (
    <FormProvider {...methods}> 
      <S.FormWrapper onSubmit={methods.handleSubmit(onSubmit)}>
        <S.LeftWrapper>
          <CitiesTimeline />
        </S.LeftWrapper>

        <S.RightWrapper>
          <QuantityInput label='Passengers' name='passengers' />
        </S.RightWrapper>

        <S.ButtonWrapper>
          <Button type="submit" variant="contained">Submit</Button>
        </S.ButtonWrapper>
      </S.FormWrapper>
    </FormProvider>
  );
}

export default SearchForm
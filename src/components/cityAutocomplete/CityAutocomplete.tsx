import { useState, useRef } from 'react'
import { useFormContext, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import MUIAutocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { getCities } from '../../data/server';

interface Option {
  title: string;
  lat: number;
  lon: number;
}

interface CityAutocomplete {
  label: string;
  name: string;
  errorMessage: string;
  index: number;
}

export const emptyOption = {
  title: '',
  lat: 0,
  lon: 0
}

const CityAutocomplete = ({ label, name, errorMessage }: CityAutocomplete) => {
  const { control, watch, setError, clearErrors } = useFormContext()
  const [isLoading, setIsLoading] = useState(false)
  const debounceRef = useRef<number | undefined>()
  const [options, setOptions] = useState<Option[]>(getCities(watch(name)?.title) || []);
  const [value, setValue] = useState<Option | null>(watch(name) || null);

  const handleChange = (e: React.SyntheticEvent, value: string) => {
    const { type } = e || {}

    clearErrors(name)
    clearTimeout(debounceRef.current)

    if (value === '') {
      setOptions([]);
      setIsLoading(false)
      return null;
    }

    if (type === 'change') {
      setIsLoading(true)
    }

    debounceRef.current = setTimeout(() => {
      // fake edge case
      if (value?.toLowerCase() === 'fail') {
        setError(name, {
          message: 'An error happened, please try a different city'
        })
        setValue({
          title: value,
          lat: 0,
          lon: 0,
        })

        setOptions([])
        setIsLoading(false)
        return null
      }

      setOptions(getCities(value))
      setIsLoading(false)
    }, 500)
  }

  return (
    <Controller 
      name={name}
      control={control}
      rules={{ 
        validate: (value) => (!!value?.title || value?.title?.toLowerCase() === 'fail') || errorMessage,
      }}
      render={({ field: { ref, onChange, ...field }, fieldState: { error }}) => (
        <MUIAutocomplete
          ref={ref}
          sx={{ width: 300 }}
          autoComplete
          onInputChange={handleChange}
          onChange={(event: React.SyntheticEvent, newValue: Option | null) => {
            setValue(newValue || emptyOption);
            onChange(newValue || emptyOption)
          }}
          defaultValue={null} 
          filterOptions={(x) => x}
          getOptionLabel={(option) => option.title}
          options={options}
          value={value}
          isOptionEqualToValue={(option, value) => option.title === value.title}
          noOptionsText='No options' // TODO VALIDATE FAIL
          loading={isLoading}
          renderInput={(params) => (
            <TextField
              {...params}
              {...field}
              label={label}
              error={!!error}
              helperText={error?.message}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
            />
          )}
        />
      )
    } />
  )
}

export default CityAutocomplete
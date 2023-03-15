import { useState, useRef } from 'react'
import { useFormContext, Controller, FieldError } from "react-hook-form";
import TextField from "@mui/material/TextField";
import MUIAutocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { getCities } from '../../data/server';

interface Option {
  title: string;
  lat: number;
  lon: number;
}

interface AutocompleteProps {
  label: string;
  name: string;
  errorMessage: string;
  index: number;
}

const emptyOption = {
  title: '',
  lat: 0,
  lon: 0
}

const Autocomplete = ({ label, name, errorMessage }: AutocompleteProps) => {
  const { control } = useFormContext()
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState<Option | null>(null);
  const [options, setOptions] = useState<Option[]>([]);
  const debounceRef = useRef<number | undefined>()

  const handleChange = (e: React.SyntheticEvent, value: string) => {
    const { type } = e || {}

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
      setOptions(getCities(value))
      setIsLoading(false)
    }, 500)
  }

  return (
    <Controller 
      name={name}
      control={control}
      rules={{ 
        validate: (value) => !!value?.title || errorMessage,
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

export default Autocomplete
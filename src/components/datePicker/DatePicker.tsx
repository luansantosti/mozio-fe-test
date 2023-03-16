import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';
import { addDays, isAfter } from 'date-fns';
import { Controller } from 'react-hook-form';

const DatePicker = () => {
  const minDate = addDays(new Date, 1)

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name='date'
        rules={{ 
          validate: (value) => isAfter(value, new Date()) || 'Date should be in the future',
        }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <MUIDatePicker
            onChange={onChange} 
            label='Date'
            value={value}
            minDate={minDate}
            slotProps={{
              textField: {
                error: !!error,
                helperText: error?.message,
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  )
}

export default DatePicker
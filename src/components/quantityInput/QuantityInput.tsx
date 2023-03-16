import { useFormContext, Controller } from "react-hook-form";
import * as S from './styles'

interface QuantityInputProps {
  label: string;
  name: string;
}

const QuantityInput = ({ label, name }: QuantityInputProps) => {
  const { setValue } = useFormContext()
  
  const handleUpdatePassengers = (e: React.MouseEvent, value: number) => {
    e.preventDefault()

    setValue(name, value, { shouldValidate: true })
  }

  return (
    <S.Wrapper>
      <Controller
        name={name}
        rules={{ 
          validate: (value) => value > 0 || 'Select passengers',
        }}
        render={({ field: { value }, fieldState: { error } }) => (
          <>
            <Button 
              onClick={handleUpdatePassengers}
              label='-'
              value={value}
            />
            <S.TextField
              InputProps={{
                readOnly: true,
                inputProps: { min: 0 }
              }}
              InputLabelProps={{
                shrink: true,
              }}
              value={value}
              error={!!error}
              helperText={error?.message}
              type='number' 
              label={label}
            />
            <Button 
              onClick={handleUpdatePassengers}
              label='+'
              action='increase'
              value={value}
            />
          </>
        )}
      />
    </S.Wrapper>
  );
}

interface ButtonProps {
  onClick: (e: React.MouseEvent, value: number) => void;
  action?: 'increase' | 'decrease';
  label: string;
  value: number;
}

const Button = ({
  onClick,
  action,
  label,
  value
}: ButtonProps) => {
  const getValidValue = () => {
    const newValue = value - 1
    
    if (newValue < 0) {
      return 0
    } 

    return newValue
  }

  const shouldIncrease = action === 'increase'
  const newValue = shouldIncrease ? value + 1 : getValidValue()
  const disabled = !shouldIncrease && value === 0

  return (
    <S.Button 
      onClick={(e: React.MouseEvent) => onClick(e, newValue)}
      variant='contained'
      disabled={disabled}
      alignRight={shouldIncrease}
    >
      {label}
    </S.Button>
  ) 
}

export default QuantityInput
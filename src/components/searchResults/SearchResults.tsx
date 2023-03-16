import { Typography } from '@mui/material';
import { format } from 'date-fns';
import * as S from './styles'

interface SearchResultsProps {
  params: {
    [k: string]: string;
  }
}

const Results = ({ params }: SearchResultsProps) => {
  const { passengers, cities, date } = params

  return (
    <S.Wrapper>
      <Typography><b>{passengers}</b> passengers</Typography>
      <Typography>{format(new Date(date), 'LLL dd, yyyy')}</Typography>
    </S.Wrapper>
  )
}

export default Results
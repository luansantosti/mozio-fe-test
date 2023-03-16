import CircularProgress from '@mui/material/CircularProgress';
;import Typography from '@mui/material/Typography';

import * as S from './styles'

interface LoadingProps {
  loadingMessage?: string;
}

const Loading = ({ loadingMessage }: LoadingProps) => {
  return (
    <S.Wrapper>
      <CircularProgress />

      <Typography variant="overline" display="block" gutterBottom>
        {loadingMessage || 'Glad to see you here!'}
      </Typography>
    </S.Wrapper>
  );
}

export default Loading
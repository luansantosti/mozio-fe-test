import { styled } from "@mui/system";
import { Button as MUIButton } from "@mui/material";

export const FormWrapper = styled('form')`
  display: flex;
  flex-wrap: wrap;
  column-gap: 80px;
  
  @media (max-width: 900px) {
    flex-direction: column;
  }
`

export const LeftWrapper = styled('div')`
  flex: 3;

  @media (max-width: 900px) {
    max-width: 375px;
  }

  @media (max-width: 400px) {
    .MuiAutocomplete-root {
      width: 250px;
    }
  }
`

export const RightWrapper = styled('div')`
  flex: 1.5;
  padding-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 900px) {
    flex-direction: row;
    padding: 0px 0 0 45px;
    max-width: 344px;
    gap: 10px;

    input {
      font-size: 13px;
    }
  }
`

export const ButtonWrapper = styled('div')`
  flex: 1;
  display: flex;
  justify-content: center;

  @media (max-width: 900px) { 
    margin-top: 40px;

    button {
      width: 100%;
    }
  }
`

export const Button = styled(MUIButton, {
  shouldForwardProp: (prop: PropertyKey) => prop !== 'showAsDisabled'
})<{ showAsDisabled: boolean }>(
  ({ showAsDisabled }) => `
    background-color: ${showAsDisabled ? '#f4f4f4' : '#1976d2'};
    color: ${showAsDisabled ? '#808080' : '#fff'};
    cursor: ${showAsDisabled ? 'default' : 'cursor'};

    &:hover {
      background-color: ${showAsDisabled ? '#f4f4f4' : '#1565c0'};
      color: ${showAsDisabled ? '#808080' : '#fff'}
    }
  `
)

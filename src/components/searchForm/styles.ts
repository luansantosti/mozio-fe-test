import { styled } from "@mui/system";
import { Button as MUIButton } from "@mui/material";

export const FormWrapper = styled('form')`
  display: flex;
  flex-wrap: wrap;
  column-gap: 80px;
`

export const LeftWrapper = styled('div')`
  flex: 3;
`

export const RightWrapper = styled('div')`
  flex: 1.5;
  padding-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`

export const ButtonWrapper = styled('div')`
  flex: 1;
  display: flex;
  justify-content: center;
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

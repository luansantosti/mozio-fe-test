import { styled } from "@mui/system";
import { Button as MUIButton, TextField as MUITextField } from "@mui/material";

export const Wrapper = styled('div')`
  position: relative;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
    -moz-appearance: textfield;
  }

  input {
    text-align: center;
  }
`

export const TextField = styled(MUITextField)({
  '& .MuiFormHelperText-root.Mui-error': {
    position: 'absolute',
    top: '100%'
  }
});

export const Button = styled(MUIButton, {
  shouldForwardProp: (prop: PropertyKey) => prop !== 'alignRight'
})<{ alignRight: boolean }>(
  ({ alignRight }) => `
    padding: 7px 10px;
    min-width: 30px;
    height: 30px;
    position: absolute;
    left: ${alignRight ? 'auto' : '10px'};
    right: ${alignRight ? '10px' : 'auto'};
    top: 14px;
    z-index: 1;
  `
)


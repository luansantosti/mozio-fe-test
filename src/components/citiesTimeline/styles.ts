import { styled } from "@mui/system"
import MUIHighlightOff from '@mui/icons-material/HighlightOff';

export const CityWrapper = styled('div')`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const HighlightOff = styled(MUIHighlightOff)`
  cursor: pointer;
  position: absolute;
  right: -20px;
  top: 22px;
`
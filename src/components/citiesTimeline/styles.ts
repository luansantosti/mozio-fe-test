import { styled } from "@mui/system"
import MUIHighlightOff from '@mui/icons-material/HighlightOff'
import MUITimelineSeparator from '@mui/lab/TimelineSeparator'
import MUIAddCircleOutline from '@mui/icons-material/AddCircleOutline'
import MUIPlaceOutlined from '@mui/icons-material/PlaceOutlined'
import MUITimelineConnector from '@mui/lab/TimelineConnector'
import MUITimelineContent from '@mui/lab/TimelineContent'
import MUIButton from '@mui/material/Button';

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

export const TimelineSeparator = styled(MUITimelineSeparator)`
  margin-top: 16px;
`

export const AddCircleOutline = styled(MUIAddCircleOutline)`
  margin: 7px -5px 0 -7px;
`

export const PlaceOutlined = styled(MUIPlaceOutlined)`
  margin: 7px -5px 0 -7px;
  color: #ff0000;
`

export const TimelineConnector = styled(MUITimelineConnector)`
  margin-bottom: -12px;
  height: 50px;
`

export const TimelineContent = styled(MUITimelineContent)`
  display: flex; 
  align-items: center;
`

export const Button = styled(MUIButton)`
  text-transform: none;
`
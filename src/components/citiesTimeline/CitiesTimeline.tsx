import { useFieldArray, useFormContext } from "react-hook-form"
import MUITimeline from '@mui/lab/Timeline'
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import PlaceOutlined from '@mui/icons-material/PlaceOutlined'
import AddCircleOutline from '@mui/icons-material/AddCircleOutline'
import Button from '@mui/material/Button';

import * as S from './styles'
import Autocomplete from "../autocomplete"
import { CITY_ORIGIN, CITY_DESTINATION, ERROR_MESSAGE } from "./utils"
import { emptyOption } from "../autocomplete/Autocomplete"

const CitiesTimeline = () => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "cities",
  });  

  return (
    <MUITimeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {fields.map((field, index) => {
        const isFinalDestinationCity = fields.length === (index + 1)
        const isIntermediateCity = index > 0 && index + 1 < fields.length 

        return (
          <TimelineItem key={field.id}>
            <TimelineSeparator sx={{ marginTop: '16px' }}>
              {isFinalDestinationCity ? <PlaceOutlined sx={{ margin: '7px -5px 0 -7px' }} /> : <TimelineDot variant="outlined" />}
              
              {!isFinalDestinationCity && <TimelineConnector sx={{ marginBottom: '-12px', height: '50px' }} />} 
            </TimelineSeparator>
            <TimelineContent>
              <S.CityWrapper>
                <Autocomplete 
                  label={isFinalDestinationCity || isIntermediateCity ? CITY_DESTINATION : CITY_ORIGIN}  
                  name={`cities.${index}`}
                  errorMessage={index === 0 ? ERROR_MESSAGE.origin : ERROR_MESSAGE.destination}
                  index={index}
                />

                {(index > 0 && fields.length > 2) && (
                  <S.HighlightOff onClick={() => remove(index)} />
                )}
              </S.CityWrapper>
            </TimelineContent>
          </TimelineItem>
        )
      })}

      <TimelineItem>
        <TimelineSeparator sx={{ marginTop: '16px' }}>
          <AddCircleOutline sx={{ margin: '7px -5px 0 -7px' }} />
        </TimelineSeparator>
        <TimelineContent sx={{ display: 'flex', alignItems: 'center' }}>
          <Button 
            sx={{ textTransform: 'none' }} 
            onClick={() => append(emptyOption)}
          >
            Add destination
          </Button>
        </TimelineContent>
      </TimelineItem>
    </MUITimeline>
  );
}

export default CitiesTimeline
import { useFieldArray, useFormContext } from "react-hook-form"
import MUITimeline from '@mui/lab/Timeline'
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'

import * as S from './styles'
import CityAutocomplete from "../cityAutocomplete"
import { CITY_ORIGIN, CITY_DESTINATION, ERROR_MESSAGE } from "./utils"
import { emptyOption } from "../cityAutocomplete/CityAutocomplete"

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
            <S.TimelineSeparator>
              {isFinalDestinationCity ? <S.PlaceOutlined /> : <TimelineDot variant="outlined" />}
              
              {!isFinalDestinationCity && <S.TimelineConnector />} 
            </S.TimelineSeparator>
            <TimelineContent>
              <S.CityWrapper>
                <CityAutocomplete 
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
        <S.TimelineSeparator>
          <S.AddCircleOutline />
        </S.TimelineSeparator>
        <S.TimelineContent>
          <S.Button onClick={() => append(emptyOption)}>
            Add destination
          </S.Button>
        </S.TimelineContent>
      </TimelineItem>
    </MUITimeline>
  );
}

export default CitiesTimeline
import React from 'react'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import PlaceOutlined from '@mui/icons-material/PlaceOutlined'

import { City } from '../../data/server';
import * as S from './styles'

interface CityWithDistance extends City {
  distanceToNext?: number;
}

interface RouteTimelineProps {
  routes: (CityWithDistance | null | undefined)[]
}

const RouteTimeline = ({ routes }: RouteTimelineProps) => (
  <S.Wrapper>
    <Timeline position="alternate">
      {routes?.map((route, index) => {
        const isFinalDestinationCity = routes.length === (index + 1)

        return (
          <React.Fragment key={index}>
            <TimelineItem>
              <TimelineSeparator>
                {isFinalDestinationCity ? <S.PlaceOutlined /> : <TimelineDot variant="outlined" />}
                {!isFinalDestinationCity && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>{route?.title}</TimelineContent>
            </TimelineItem>
            {!!route?.distanceToNext && (
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>{route.distanceToNext.toFixed(2)} km</TimelineContent>
              </TimelineItem>
            )}
          </React.Fragment>
        )
      })}
    </Timeline>
  </S.Wrapper>
)

export default RouteTimeline
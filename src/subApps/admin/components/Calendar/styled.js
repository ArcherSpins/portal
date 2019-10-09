import styled, { css } from 'styled-components';
// import React from 'react';
import { DaysLabels as Days } from 'okami';

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
`;

export const DayText = styled.span`
  text-align: center;
  color: #333333;
  display: inline-block;
  height: 2rem;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DayLabel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 1.8rem;
  ${({ isToday }) => isToday && css`
    ${DayText} {
      background: #61B16F;
      color: white;
      border-radius: 50%;
    }
  `}

  ${({ isWeekend }) => isWeekend && css`
    ${DayText} {
      color: #919191;
    }
  `}

  ${({ isCurrentMonth }) => !isCurrentMonth && css`
    ${DayText} {
      color: #D6D6D6;
    }
  `}
`;

// const EventDiv = styled.div`
//   z-index: 9;
//   position: relative;
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: center;
//   font-size: 0.9rem;
//   color: #fff;
//   overflow: hidden;
//   white-space: nowrap;
//   text-overflow: ellipsis;
//   cursor: pointer;
//   padding: 0 0.4rem;
//   box-shadow: inset 0 0 0 1px #fff;
//   background-color: ${({ event }) => (event.color ? event.color : '#232323')};
// `;

// const MEventDiv = styled.div`
//   z-index: 9;
//   position: relative;
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: center;
//   font-size: 0.8rem;
//   overflow: hidden;
//   white-space: nowrap;
//   text-overflow: ellipsis;
//   cursor: pointer;
//   padding: 0 0.4rem;
// `;

export const DateDisplayer = styled.div`
  font-size: 0.9rem;
  padding-left: 1rem;
`;

export const Div = styled.div``;

export const DayCell = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  background-color: #FFF;
  width: 2rem;
  justify-content: center;
`;

export const CalendarWrap = styled(Div)`
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
`;

export const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 1rem;
  grid-template-rows: repeat(3, 1fr);
  height: 100%;
`;

export const DivGrid = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: min-content 1fr;
`;

export const MonthLabel = styled(Div)`
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  line-height: 1.5rem;
  color: #333;
`;


export const DaysLabels = styled(Days)`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  width: 100%;
  color: #919191;
`;

// export const MEvent = ({ event, style }: { event: mixed, style: mixed }) => (
//   <MEventDiv style={style} event={event} title={event.title}>
//     {event.title}
//   </MEventDiv>
// );

// export const Event = ({ event, style }: { event: mixed, style: mixed }) => (
//   <EventDiv style={style} event={event} title={event.title}>
//     {event.title}
//   </EventDiv>
// );

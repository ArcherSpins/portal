// @flow
import React, { useState, useEffect } from 'react';
// $FlowFixMe
import { format } from 'date-fns';
import {
  Label,
  Text,
  FieldBlock,
  Icon,
  FlexBlock,
} from './styled';
import { Picker } from '..';
// $FlowFixMe
import calendar from '../../assets/icons/calendar.svg';

type InputToggleProps = {
  onChange: (string, string) => void,
  showInput: boolean,
  date: string,
  label: string,
  idx: string,
  toggleEdit: (boolean) => void,
  style: {
    [string]: mixed
  },
}

export default ({
  onChange,
  showInput,
  date,
  label,
  idx,
  toggleEdit,
  style,
}: InputToggleProps) => {
  const [dateProps, changeDateProps] = useState(date);
  const [dateState, changeDateState] = useState(date);
  const [show, toggleShow] = useState(showInput);

  useEffect(() => {
    if (date !== dateProps) {
      changeDateProps(date);
    }

    if (showInput === false) {
      toggleShow(showInput);
    }
  }, [date, showInput]);

  const handleChange = (_date) => {
    changeDateState(_date);
    toggleEdit(true);
    onChange(idx, _date.toISOString());
  };

  const DblClick = () => {
    toggleEdit(true);
    toggleShow(true);
  };


  if (!dateProps) {
    return null;
  }

  if (show) {
    return (
      <FieldBlock>
        <Label>{label}</Label>
        {/* <div className="d-flex">
          <Text style={{ display: 'flex' }}>
            {format(dateState, 'DD.MM.YYYY')}
          </Text>
          <div className="calendar-button-block position-relative">
            <Icon src={calendar} />
          </div>
        </div> */}
        <Picker
          style={[style]}
          date={dateState}
          handleChange={handleChange}
        />
      </FieldBlock>
    );
  }

  return (
    <FieldBlock>
      <Label>{label}</Label>
      <FlexBlock>
        <Text
          onDoubleClick={DblClick}
        >
          {format(dateProps, 'DD.MM.YYYY')}
        </Text>
        <Icon src={calendar} />
      </FlexBlock>
    </FieldBlock>
  );
};

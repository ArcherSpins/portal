// @flow
import React, { useState } from 'react';
import {
  Input,
  InputContainer,
  Icon,
  ClearButton,
} from './styled';
// $FlowFixMe
import searchIcon from './search.svg';
import './style.scss';

type InputSearchProps = {
  style: {
    [string]: string | number
  },
  onChange: (e: SyntheticEvent<any>) => void,
  value: string,
  onClear: () => void
}

export default ({
  onChange, value, onClear,
}: InputSearchProps) => {
  const [focus, toggleFocus] = useState(false);

  return (
    <InputContainer
      style={{ borderColor: focus ? '#61B16F' : '#C6CCD5' }}
      className="search-container"
    >
      <Icon src={searchIcon} />
      <Input
        onFocus={() => toggleFocus(true)}
        onBlur={() => toggleFocus(false)}
        className="search-input"
        onChange={onChange}
        value={value}
        placeholder="Name, department, position, skills"
      />
      {
        value && value.length > 0 ? (
          <ClearButton onClick={onClear} type="button">&times;</ClearButton>
        ) : null
      }
    </InputContainer>
  );
};

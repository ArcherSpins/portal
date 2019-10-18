// @flow
import React, { useState, useEffect } from 'react';
import {
  Label,
  Input,
  Text,
  FieldBlock,
} from './styled';

type InputToggleProps = {
  onChange: (string, string) => void,
  showInput: boolean,
  title: string,
  label: string,
  idx: string,
  toggleEdit: (boolean) => void,
  required: boolean,
  type: string,
  defaultValue: string,
  error: boolean
}

export default ({
  onChange,
  showInput,
  title,
  label,
  idx,
  toggleEdit,
  type,
  required,
  defaultValue,
  error,
}: InputToggleProps) => {
  const [text, changeTitle] = useState(title || defaultValue || 'Not value');
  const [value, changeValue] = useState(title);
  const [show, toggleShow] = useState(showInput);

  useEffect(() => {
    if (text !== title) {
      changeTitle(title || defaultValue || 'Not value');
      changeValue(title);
    }

    if (showInput === false) {
      toggleShow(showInput);
      changeValue(title);
    }
  });

  const change = (_value: string): void => {
    changeValue(_value);
    onChange(idx, _value);
  };

  const DblClick = () => {
    toggleEdit(true);
    toggleShow(true);
  };

  if (showInput && show) {
    return (
      <FieldBlock>
        <Label error={error}>{label}</Label>
        <Input
          autoFocus
          error={error}
          required={required}
          placeholder={label}
          type={type || 'text'}
          value={value}
          onChange={(e) => change(e.target.value)}
        />
      </FieldBlock>
    );
  }

  return (
    <FieldBlock>
      <Label error={error}>{label}</Label>
      <Text error={error} onDoubleClick={DblClick}>{text}</Text>
    </FieldBlock>
  );
};

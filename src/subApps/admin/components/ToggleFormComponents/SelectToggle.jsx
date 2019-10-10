// @flow
import React, { useState } from 'react';
import { FieldBlock, Label } from './styled';
import { Select } from '../index';
import './style.scss';

type SelectToggleProps = {
  options: Array<{label: string, active: boolean, id: string, name: string}>,
  onChange: (string, { label: string, active: boolean, id: string }) => void,
  idx: string,
  label: string,
  toggleEdit: (boolean) => void,
  isSearch: boolean,
  async: boolean,
  error: boolean,
}

const SelectToggle = (props: SelectToggleProps) => {
  const {
    options,
    onChange,
    idx,
    label,
    isSearch,
    toggleEdit,
    error,
  } = props;
  const [selected] = useState(options.length > 0
    ? options.find((item) => item.active) || options[0] : {});

  const changeSelect = (select: { label: string, active: boolean, id: string }) => {
    onChange(idx, select);
    toggleEdit(true);
  };

  return (
    <FieldBlock>
      <Label error={error}>{label}</Label>
      <Select
        {...props}
        error={error}
        isSearch={isSearch}
        className="not-border-select fz-14"
        options={options.map((item) => ({
          ...item,
          value: item ? item.label || item.name : null,
          label: item ? item.label || item.name : null,
        }))}
        selected={selected}
        onChange={changeSelect}
      />
    </FieldBlock>
  );
};

export default SelectToggle;

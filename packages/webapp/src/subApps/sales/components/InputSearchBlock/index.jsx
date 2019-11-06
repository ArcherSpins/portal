/* eslint-disable import/prefer-default-export */
// @flow
import React from 'react';
import Select from 'react-select';

import './style.scss';

type InputSearchType = {
  collection: Array<{
    id: string,
    label: string,
    value: string
  }>,
  className: string,
  onChange: (string, string | number, mixed, mixed) => void,
  id: number | string,
  active: {
    id: string,
    label: string,
    value: string
  },
  placeholder: string | null
}

export const InputSearch = ({
  collection, className, onChange, id, active, placeholder,
}: InputSearchType) => {
  const handleSearch = (obj) => {
    onChange(obj.id, id || 'idSm', obj, obj);
  };

  const defaultActive = active || { id: '0', label: '', value: '' };

  return (
    <Select
      id={id}
      value={defaultActive}
      onChange={(selected) => handleSearch(selected)}
      className={className}
      options={collection}
      placeholder={placeholder}
    />
  );
};

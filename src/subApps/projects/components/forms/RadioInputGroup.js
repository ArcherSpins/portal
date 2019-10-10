// @flow

import React from 'react';

type Props = {
  type: string,
  id: string,
  name: string,
  onChange: (SyntheticInputEvent<HTMLInputElement>) => void,
  htmlFor: string,
  value: string,
  spanText: string,
  checked?: boolean
}

export default function RadioInputGroup({
  type,
  id,
  name,
  onChange,
  value,
  htmlFor,
  spanText,
  checked = false,
}: Props) {
  return (
    <div className="cpp__radio-group">
      <input
        defaultChecked={checked}
        type={type}
        id={id}
        name={name}
        onChange={onChange}
        className="cpp__radio-input"
        value={value}
      />
      <label htmlFor={htmlFor} className="cpp__form-label">
        <span className="cpp__radio-button" />
        {spanText}
      </label>
    </div>
  );
}

RadioInputGroup.defaultProps = {
  checked: false,
};

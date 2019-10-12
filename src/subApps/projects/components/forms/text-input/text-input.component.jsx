// @flow
import React from 'react';

import './text-input.styles.scss';

type Props = {
  header?: string,
  onChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  value: string,
  type?: string,
  name?: string,
  maxLength?: string
};

const TextInput = ({ header, ...rest }: Props) => (
  <div className="input-wrapper">
    {header ? <h3 className="input-header">{header}</h3> : null}
    <input className="text-input" {...rest} />
  </div>
);

TextInput.defaultProps = {
  header: '',
  type: '',
  name: '',
  maxLength: '',
};

export default TextInput;

/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
// @flow
import React from 'react';
import styles from './TextArea.module.scss';

type Props = {
  name?: string,
  value?: string,
  onChange: (e: SyntheticEvent<HTMLInputElement>) => void,
  id: string,
  placeholder?: string,
  className: string,
  style?: {
    [string]: number | string
  }
}


const TextArea = ({
  name, value, onChange, id, placeholder, className, style,
}: Props) => (
  <textarea style={style} className={styles[className]} placeholder={placeholder} name={name} id={id} onChange={onChange} value={value} cols="30" rows="10" />
);

TextArea.defaultProps = {
  name: '',
  placeholder: '',
  value: '',
  style: '',
};

export default TextArea;

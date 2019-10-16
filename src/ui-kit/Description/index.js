/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
// @flow
import React from 'react';
import styles from './Description.module.scss';

type Props = {
  name?: string,
  value?: string,
  onChange: (e: SyntheticEvent<HTMLInputElement>) => void,
  id: string,
  placeholder?: string,
  className: string
}


const Description = ({
  name, value, onChange, id, placeholder, className,
}: Props) => (
  <textarea className={styles[className]} placeholder={placeholder} name={name} id={id} onChange={onChange} value={value} cols="30" rows="10" />
);

Description.defaultProps = {
  name: '',
  placeholder: '',
  value: '',
};

export default Description;

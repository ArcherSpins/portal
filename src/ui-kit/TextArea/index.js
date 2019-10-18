// @flow
import React from 'react';
import classNames from 'classnames';
import styles from './TextArea.module.scss';

type Props = {
  name?: string,
  value?: string,
  onChange: (e: SyntheticEvent<HTMLInputElement>) => void,
  id: string,
  placeholder?: string,
  className?: string,
  style?: {
    [string]: mixed
  },
  cols?: string,
  rows?: string,
  use?: string,
  label?: string,
  disabled?: boolean
}


const TextArea = ({
  name,
  value,
  onChange,
  id,
  placeholder,
  className,
  style,
  cols,
  rows,
  use,
  label,
  disabled,
}: Props) => (
  <label htmlFor={name}>
    {label}
    <textarea
      style={style}
      className={classNames(styles.textarea, { [styles.use]: use }, className)}
      placeholder={placeholder}
      name={name}
      id={id}
      onChange={onChange}
      value={value}
      cols={cols}
      rows={rows}
      disabled={disabled}
    />
  </label>
);

TextArea.defaultProps = {
  name: '',
  placeholder: '',
  value: '',
  style: {},
  cols: '30',
  rows: '10',
  className: '',
  use: '',
  label: '',
  disabled: false,
};

export default TextArea;

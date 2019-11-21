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
  label?: string,
  disabled?: boolean,
  labelClassName?: string
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
  label,
  disabled,
  labelClassName,
  ...restProps
}: Props) => (
  <label htmlFor={name} className={classNames(styles.label, labelClassName)}>
    <span>{label}</span>
    <textarea
      {...restProps}
      style={style}
      className={classNames(styles.textarea, className)}
      placeholder={placeholder}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
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
  label: '',
  disabled: false,
  labelClassName: '',
};

export default TextArea;

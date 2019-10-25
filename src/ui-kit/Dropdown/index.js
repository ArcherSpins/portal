/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
// @flow
import React from 'react';
import classNames from 'classnames';
import Select, { components } from 'react-select';
import styles from './style.scss';


type DropdownType = 'borderless' | 'default';

type Props = {
  label: string,
  placeholder?: string,
  use: DropdownType,
  className?: string,
  disabled?: boolean,
  options: Array<{value: string, label: string}>,
  value?: string,
  name?: string,
  onChange: (e: SyntheticEvent<HTMLInputElement>) => void,
}

const DropdownIndicator = (props) => (
  <components.DropdownIndicator {...props}>
    <i className="icon-down-dir" />
  </components.DropdownIndicator>
);

// TODO: move styles to separate scss file
const Dropdown = ({
  label,
  placeholder,
  disabled,
  options,
  value,
  name,
  onChange,
  use,
  className,
  ...restProps
}: Props) => (
  <div className={classNames(styles.wrapper, `cbx__wrap dropdown dropdown_${use || ''}`, className)}>
    <label className={classNames(styles[use], 'cbx__label')} htmlFor="select">{label}</label>
    <Select
      className="select-component"
      isSearchable={false}
      onChange={onChange}
      placeholder={placeholder}
      components={{ DropdownIndicator }}
      classNamePrefix="cbx"
      options={options}
      name={name}
      value={value}
      isDisabled={disabled}
      {...restProps}
    />
  </div>
);

Dropdown.defaultProps = {
  placeholder: '',
  disabled: false,
  name: '',
  value: '',
  className: '',
};


export default Dropdown;

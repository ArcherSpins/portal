/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
// @flow
import React from 'react';
import classNames from 'classnames';
import Select, { components } from 'react-select';
import styles from './Dropdown.module.scss';
import './styles.scss';

import type { Option, Action } from '../Combobox';

type DropdownType = 'borderless' | 'default';

type Props = {
  label: string,
  placeholder?: string,
  use: DropdownType,
  className?: string,
  disabled?: boolean,
  options: Array<Option>,
  value?: Option,
  name?: string,
  onChange: (option: Option, action: Action) => void,
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
  ...rest
}: Props) => {
  const customStyles = {
    indicatorSeparator: () => {},
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? '#61B16F' : '#D1D6DE',
      '&:hover': {},
      '&:focus': { borderColor: 'red' },
      border: use === 'borderless' ? 'none' : base.border,
      transition: 'all 0.3s',
      boxShadow: 'none',
    }),
    option: (base, { isSelected }) => ({
      ...base,
      '&:hover': { backgroundColor: '#ddeee0' },
      backgroundColor: isSelected && '#61B16F',
    }),
  };

  return (
    <div className={classNames('drwn__wrap', styles.wrapper, className)}>
      <label className={styles[use]} htmlFor="select">{label}</label>
      <Select
        {...rest}
        className="select-component"
        isSearchable={false}
        onChange={onChange}
        placeholder={placeholder}
        components={{ DropdownIndicator }}
        styles={customStyles}
        options={options}
        name={name}
        value={value}
        isDisabled={disabled}
        classNamePrefix="drwn"
      />
    </div>
  );
};

Dropdown.defaultProps = {
  placeholder: '',
  disabled: false,
  name: '',
  value: '',
  className: '',
};


export default Dropdown;

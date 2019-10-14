/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
// @flow
import React from 'react';
import Select, { components } from 'react-select';
import noop from 'lodash.noop';
import styles from './Dropdown.module.scss';


type Props = {
  label?: string,
  placeholder?: string,
  use?: string,
  disabled?: boolean,
  borderless?: boolean,
  options?: Array<{value: string, label: string}>,
  value?: string,
  name?: string,
  onChange?: (e: SyntheticEvent<HTMLInputElement>) => void,
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
  borderless,
  options,
  value,
  name,
  onChange,
  use,
}: Props) => {
  const customStyles = {
    indicatorSeparator: () => {},
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? '#61B16F' : '#D1D6DE',
      '&:hover': {},
      '&:focus': { borderColor: 'red' },
      border: borderless ? 'none' : base.border,
      boxShadow: 'none',
    }),
    container: (base) => ({
      ...base,
      width: '30%',
    }),
    option: (base, { isSelected }) => ({
      ...base,
      '&:hover': { backgroundColor: '#ddeee0' },
      backgroundColor: isSelected && '#61B16F',
    }),
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles[use]} htmlFor="select">{label}</label>
      <Select
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
      />
    </div>
  );
};

Dropdown.defaultProps = {
  placeholder: '',
  disabled: false,
  borderless: false,
  options: [],
  label: '',
  onChange: noop,
  name: '',
  value: '',
  use: '',
};


export default Dropdown;

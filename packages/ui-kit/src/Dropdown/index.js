/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
// @flow
import React from 'react';
import classNames from 'classnames';
import Select, { components } from 'react-select';
import modules from './Dropdown.module.scss';
import styles from './style.scss';

import type { Option, Action } from '../Combobox';

type DropdownType = 'borderless' | 'default';

type Props = {
  label: string,
  placeholder?: string,
  use: DropdownType,
  className?: string,
  disabled?: boolean,
  options: Array<Option>,
  error?: string,
  value?: Option,
  name?: string,
  dataTest?: string,
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
  use = 'default',
  className,
  error,
  dataTest,
  ...restProps
}: Props) => (
  <div
    data-test={dataTest}
    className={classNames(
      modules.wrapper, `cbx__wrap dropdown dropdown_${use || ''}`,
      className,
      {
        'error-select': !!error,
      },
    )}
  >
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
    {
      error && <p className={modules['error-text']}>{error}</p>
    }
  </div>
);

Dropdown.defaultProps = {
  placeholder: '',
  disabled: false,
  name: '',
  value: '',
  className: '',
  error: null,
  dataTest: '',
};


export default Dropdown;

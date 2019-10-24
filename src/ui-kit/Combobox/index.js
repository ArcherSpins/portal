// @flow
/* eslint-disable */
import React from 'react';
import Spinner from 'ui-kit/Spinner';
import classNames from 'classnames';
// $FlowFixMe
import AsyncSelect from 'react-select/lib/Async';
import { components } from 'react-select';
import './style.scss';

type Option = {
  id: string,
  label: string,
  value: string
}

type Action = {
  action: string,
  name: ?string,
  option?: string
}

type ComboboxType = 'borderless' | 'default';

type Props = {
  loadOptions: () => Promise<Array<Option>>,
  defaultOptions?: boolean,
  selectedOption?: Option,
  error?: string,
  use?: ComboboxType,
  label?: string,
  onChange: (option: Option, action: Action) => void,
  className?: string
}

const DropdownIndicator = (props) => (
  <components.DropdownIndicator {...props}>
    <i className="icon-down-dir" />
  </components.DropdownIndicator>
);

const LoadingIndicator = () => null;

const NoOptionsMessage = () => (
  <p className="no-results">No results</p>
);

const LoadingMessage = () => (
  <div className="cbx__loader container-loader_combobox">
    <Spinner use="dark" style={{ width: '1rem', height: '1rem' }} />
    <span>Loading...</span>
  </div>

);


const Combobox = ({
  loadOptions,
  defaultOptions,
  onChange,
  selectedOption,
  error,
  label,
  className,
  use,
  ...restProps
}: Props) => {
  const customStyles = {
    indicatorSeparator: () => {},
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? '#61B16F' : '#D1D6DE',
      '&:hover': {},
      '&:focus': { borderColor: 'red' },
      border: use === 'borderless' ? 'none !important' : base.border,
      transition: 'all 0.3s',
      boxShadow: 'none',
    }),
    container: (base) => ({
      ...base,
    }),
    option: (base, { isSelected }) => ({
      ...base,
      '&:hover': { backgroundColor: '#ddeee0' },
      backgroundColor: isSelected && '#61B16F',
    }),
  };
  return (
    <div
      className={
        classNames(
          'cbx__wrap wrapper',
          {
            selected: !!selectedOption,
            'error-select': !!error,
          },
          className,
        )
      }
    >
      <label className={`${use || ''}`} htmlFor="select">{label}</label>
      <AsyncSelect
        className="select-component"
        loadOptions={loadOptions}
        defaultOptions={defaultOptions}
        value={selectedOption}
        onChange={onChange}
        classNamePrefix="cbx"
        styles={customStyles}
        components={{
          LoadingIndicator,
          LoadingMessage,
          DropdownIndicator,
          NoOptionsMessage,
        }}
        {...restProps}
      />
      {
        error && <p className="error-text">{error}</p>
      }
    </div>
  );
}

Combobox.defaultProps = {
  defaultOptions: true,
  selectedOption: null,
  error: null,
  label: '',
  use: 'default',
  className: '',
};

export default Combobox;

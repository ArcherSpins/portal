// @flow
/* eslint-disable */
import React from 'react';
import Spinner from '../Spinner';
import classNames from 'classnames';
// $FlowFixMe
import AsyncSelect from 'react-select/lib/Async';
import { components } from 'react-select';
import './style.scss';

export type Option = {
  label: string,
  value: string
}

export type Action = {
  action: string,
  name: ?string,
  option?: string
}

type ComboboxType = 'borderless' | 'default' | 'underlined' | 'grey';

type Props = {
  loadOptions: () => Promise<Array<Option>>,
  defaultOptions?: boolean,
  selectedOption?: Option,
  error?: string,
  use?: ComboboxType,
  label?: string,
  onChange: (option: Option, action: Action) => void,
  className?: string,
  dataTest?: string
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
  label = '',
  dataTest,
  className,
  use = 'default',
  ...restProps
}: Props) => (
  <div
    data-test={dataTest}
    className={
      classNames(
        'cbx__wrap wrapper combobox',
        `combobox_${use}`,
        {
          selected: !!selectedOption,
          'error-select': !!error,
        },
        className,
      )
    }
  >
    <label className="cbx__label" htmlFor="select">{label}</label>
    <AsyncSelect
      className="select-component"
      loadOptions={loadOptions}
      defaultOptions={defaultOptions}
      value={selectedOption}
      onChange={onChange}
      classNamePrefix="cbx"
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

Combobox.defaultProps = {
  defaultOptions: true,
  selectedOption: null,
  error: null,
  label: '',
  use: 'default',
  className: '',
};

export default Combobox;

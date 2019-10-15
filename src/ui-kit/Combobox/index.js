// @flow
import React from 'react';
import Spinner from 'ui-kit/Spinner';
import classNames from 'classnames';
// $FlowFixMe
import AsyncSelect from 'react-select/lib/Async';
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

type Props = {
  loadOptions: () => Promise<Array<Option>>,
  defaultOptions?: boolean,
  selectedOption?: Option,
  error?: string,
  label?: string,
  onChange: (option: Option, action: Action) => void,
  className?: string
}

const LoadingIndicator = () => null;

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
  ...restProps
}: Props) => (
  <div
    className={
      classNames(
        'cbx__wrap',
        {
          selected: !!selectedOption,
          'error-select': !!error,
        },
        className,
      )
    }
  >
    {
      label && <p className="label-combobox">{label}</p>
    }
    <AsyncSelect
      loadOptions={loadOptions}
      defaultOptions={defaultOptions}
      value={selectedOption}
      onChange={onChange}
      classNamePrefix="cbx"
      components={{
        LoadingIndicator,
        LoadingMessage,
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
  className: '',
};

export default Combobox;

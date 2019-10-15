// @flow
import React from 'react';
import Spinner from 'ui-kit/Spinner';
// $FlowFixMe
import AsyncSelect from 'react-select/lib/Async';
import './style.scss';

type Option = {
  id: string,
  label: string
}

type Action = {
  action: string,
  name: ?string,
  option?: string
}

type Props = {
  loadOptions: () => Promise<Array<Option>>,
  defaultOptions?: boolean,
  onChange: (option: Option, action: Action) => void
}

const LoadingIndicator = () => null;

const LoadingMessage = () => (
  <div className="cbx__loader">
    <Spinner use="dark" style={{ width: '1rem', height: '1rem' }} />
    <span>Loading...</span>
  </div>

);

const Combobox = ({ loadOptions, defaultOptions, onChange }: Props) => (
  <div className="cbx__wrap">
    <AsyncSelect
      loadOptions={loadOptions}
      defaultOptions={defaultOptions}
      onChange={onChange}
      classNamePrefix="cbx"
      components={{
        LoadingIndicator,
        LoadingMessage,
      }}
    />
  </div>
);

Combobox.defaultProps = {
  defaultOptions: true,
};

export default Combobox;

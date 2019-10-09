// @flow
import React, { Component } from 'react';
import {
  Wrap,
  customStyles,
  getTheme,
  ComboboxWrap,
  ErrorText,
  InputWrap,
  Label,
  FieldBlock,
} from './styled';
import './style.scss';

type Option = {
  label: string,
  value: string
}

type Props = {
  options: Array<Option>,
  placeholder?: string,
  type?: 'borderless' | 'default',
  onChange: (string, Option) => void,
  onBlur: (string, boolean) => void,
  error?: string,
  value: null | Option,
  name: string,
  small?: boolean,
  label: string
}

// eslint-disable-next-line react/prefer-stateless-function
class Combobox extends Component<Props> {
  static defaultProps = {
    type: 'default',
    placeholder: 'Enter or pick from list',
    error: '',
    small: false,
  }

  onInputChange = (option: Option) => {
    const { onChange, name } = this.props;
    onChange(name, option);
  }

  handleBlur = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { onBlur, name, options } = this.props;
    const { value } = e.target;
    const option = options.find((o) => o.label === value);

    if (option) {
      this.onInputChange(option);
    }
    onBlur(name, true);
  }

  render() {
    const {
      placeholder, error, label,
    } = this.props;
    return (
      <FieldBlock>
        <InputWrap>
          <Label>{label}</Label>
          <Wrap style={{ width: '78%' }}>
            <ComboboxWrap
              {...this.props}
              styles={customStyles}
              classNamePrefix="select"
              theme={getTheme}
              placeholder={placeholder}
              onChange={this.onInputChange}
              noOptionsMessage={() => 'No results'}
              // onBlur={this.handleBlur}
            />
          </Wrap>
          {error && <ErrorText>{error}</ErrorText>}
        </InputWrap>
      </FieldBlock>
    );
  }
}

export default Combobox;

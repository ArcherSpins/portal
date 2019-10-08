// @flow
import React, { Component } from 'react';
import {
  Container,
  InputWrap,
  Label,
  Error,
} from './styled';

type Props = {
  value?: string,
  placeholder: string,
  error?: string | null,
  styling?: 'borderless' | 'default',
  onChange: (SyntheticInputEvent<HTMLInputElement>) => any,
  small?: boolean,
  label?: string,
  style?: Object,
  inputStyle?: Object,
  sideLabel?: string,
}

class TextInput extends Component<Props> {
  static defaultProps = {
    value: '',
    error: null,
    styling: 'default',
    small: false,
    label: '',
    style: {},
    sideLabel: '',
    inputStyle: {},
  }

  onInputChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    onChange(e);
  }

  render() {
    const {
      label, error, style, inputStyle,
    } = this.props;
    return (
      <div style={style}>
        <Container>
          {label && <Label>{label}</Label>}
          <InputWrap
            {...this.props}
            style={inputStyle}
            onChange={this.onInputChange}
          />
          <Error>{error}</Error>
        </Container>
      </div>
    );
  }
}

export default TextInput;

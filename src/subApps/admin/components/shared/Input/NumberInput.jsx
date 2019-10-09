// @flow
import React, { Component } from 'react';
import {
  Container,
  NumberInputWrap,
} from './styled';

type Props = {
  value?: any,
  onChange: (SyntheticEvent<HTMLInputElement>) => void,
  inputStyle?: {
    [string]: string | number
  },
  style?: {
    [string]: string | number
  }
}

class NumberInput extends Component<Props> {
  static defaultProps = {
    value: '',
    inputStyle: {},
    style: {},
  }

  onInputChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    onChange(e);
  }

  render() {
    const {
      inputStyle,
      style,
    } = this.props;
    return (
      <Container style={style}>
        <NumberInputWrap
          type="number"
          {...this.props}
          style={inputStyle}
          onChange={this.onInputChange}
        />
      </Container>
    );
  }
}

export default NumberInput;

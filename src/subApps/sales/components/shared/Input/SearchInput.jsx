// @flow
import React, { Component } from 'react';
import {
  SearchWrap,
  SearchInput,
  SearchIcon,
} from './styled';
// $FlowFixMe
import img from './search.svg';
// import xmark from './xmark.svg'; Reset, ResetIcon,
import './style.scss';


type Props = {
  placeholder: string,
  error?: boolean,
  styling?: 'borderless' | 'default',
  value?: string,
  onChange: (string, string) => void,
  small?: boolean
}

type State = {
  focused: boolean
}
class Input extends Component<Props, State> {
  static defaultProps = {
    error: false,
    styling: 'default',
    value: '',
    small: false,
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      focused: false,
    };
  }


  onFocus = () => {
    this.setState({
      focused: true,
    });
  }

  onBlur = () => {
    this.setState({
      focused: false,
    });
  }

  reset = () => {
    const { onChange } = this.props;
    onChange('', '');
  }

  onInputChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    onChange(e.target.name, e.target.value);
  }

  render() {
    const { focused } = this.state;
    const {
      small, value, onChange, placeholder,
    } = this.props;
    return (
      <div>
        <SearchWrap focused={focused} small={small}>
          <SearchIcon src={img} alt="search" />
          <SearchInput
            {...this.props}
            value={value}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={onChange}
            placeholder={placeholder || 'Search..'}
          />
          {/* <Reset onClick={this.reset}>
            <ResetIcon src={xmark} alt="reset" />
          </Reset> */}
        </SearchWrap>
      </div>
    );
  }
}

export default Input;

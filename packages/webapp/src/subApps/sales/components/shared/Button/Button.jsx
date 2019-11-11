// @flow
import React from 'react';
import { ButtonWrap, TextWrap } from './styled';
import Preloader from './ButtonPreloader';

export type ButtonProps = {
  text: string,
  loading?: boolean,
  styling?: 'transparent' | 'grey' | 'borderless' | 'black-transparent' | 'default' | 'green-borderless' | 'danger',
  disabled?: boolean,
  active?: boolean,
  onClick: () => any,
  small?: boolean,
  style?: mixed,
  styleButton?: mixed,
  className?: string,
  styleText?: mixed,
}


const Button = ({
  text,
  loading = 'false',
  styling,
  active,
  disabled,
  onClick,
  styleButton,
  small = false,
  styleText,
  className,
  style,
  ...props
}: ButtonProps) => (
  <div
    className={className}
    style={{ ...style, display: 'inline-block' }}
  >
    <ButtonWrap
      onClick={onClick}
      styling={styling}
      style={styleButton}
      loading={loading}
      active={loading ? false : active}
      disabled={disabled}
      small={small}
      className={className}
      {...props}
    >
      <TextWrap
        className={className}
        style={styleText}
        loading={loading}
      >
        {text}
      </TextWrap>
      <Preloader loading={loading} styling={styling} small={small} />
    </ButtonWrap>
  </div>
);

Button.defaultProps = {
  styling: 'default',
  loading: false,
  active: false,
  disabled: false,
  small: false,
  style: {},
  styleButton: {},
  className: '',
  styleText: {},
};

export default Button;

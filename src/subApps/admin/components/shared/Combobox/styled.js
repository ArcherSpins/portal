/* eslint-disable no-nested-ternary */
import styled, { css } from 'styled-components';
// $FlowFixMe
import { Async } from 'react-select';

export const ComboboxWrap = styled(Async)`
  appearance: none;
  outline: none;
  transition: all .2s ease-in;
  &:focus {
    box-shadow: 0 0 0 2px #FFBE3F;
  }
  &::-ms-expand { 
    display: none; 
  }

  ${({ error }) => error && css`
    .select__control {
      border-color: #DF160A
      &:hover {
        border-color: #DF160A
      }
    }
  `}

  ${({ small }) => small && css`
    .select__control {
      padding: 0.1rem 0.625rem
    }
  `}
`;

// @flow
export const customStyles = {
  control: (styles: Object, state: Object) => {
    const { isFocused, hasValue } = state;
    return {
      ...styles,
      borderWidth: '1px',
      padding: '0.2rem 0.625rem',
      borderStyle: hasValue ? 'solid' : 'dashed',
      minWidth: '18rem',
      boxShadow: 'none',
      borderColor: isFocused ? '#61B16F' : '#C6CCD5',
    };
  },
  indicatorsContainer: (styles: Object) => ({
    ...styles,
    display: 'none',
  }),
  valueContainer: (styles: Object) => ({
    ...styles,
    padding: 0,
  }),
  option: (styles: Object, { isDisabled, isFocused, isSelected }: Object) => ({
    ...styles,
    backgroundColor: isDisabled
      ? null
      : isSelected ? '#61B16F' : isFocused ? '#61B16F' : null,
    color: isDisabled
      ? null
      : isSelected ? 'white' : isFocused ? 'white' : null,
  }),
  menu: (styles: Object) => ({
    ...styles,
    marginTop: 0,
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
  }),
  noOptionsMessage: (styles: Object) => ({
    ...styles,
    textAlign: 'left',
  }),
};

// $FlowFixMe
export const Wrap = styled.div`
  position: relative;
  border-radius: 0.25rem;
  background: white;
  line-height: 1.5rem;
  font-size: 1rem;
  font-family: 'Proxima Nova';
  color: #333;
  &:after {
    content: '';
    position: absolute;
    width: 0; 
    height: 0; 
    right: 1rem;
    top: 50%;
    margin-top: calc(-0.3rem/2);
    border-left: 0.3rem solid transparent;
    border-right: 0.3rem solid transparent;
    border-top: 0.3rem solid #333;
  }

`;

export const Label = styled.label`
  margin-bottom: 7px;
  display: block;
  color: #79818D;
  font-family: Proxima Nova;
  font-size: 14px;
  line-height: 20px;
`;

export const FieldBlock = styled.div`
  width: 50%;
`;

// react-select doesnt support override theme in styles, so we need this little hack
export const getTheme = (theme: Object) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary50: '#61B16F',
    primary: '#61B16F',
  },
});

export const ErrorText = styled.p`
  color: #DF160A;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  min-height: 1rem;
`;

export const InputWrap = styled.div``;

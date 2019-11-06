import styled, { css } from 'styled-components';

export const ButtonWrap = styled.button`
  line-height: 1rem;
  padding: 0.375rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 0.25rem;
  cursor: pointer;
  position: relative;
  min-width: 4rem;
  transition: all .2s ease-in;
  background: transparent;
  color: #333;
  outline: none;
  border: none;
  font-family: Proxima Nova;
  &:focus {
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.green};
  }

  /* default button */
  ${({ styling }) => styling === 'default' && css`
    background: ${(props) => (props.active ? '#65A771' : props.theme.colors.green)};
    border: 1px solid ${(props) => props.theme.colors.buttonBorder};
    color: white;
    &:hover {
      background: ${(props) => (props.loading ? props.theme.colors.green : props.theme.colors.buttonHover)};
    }
    ${({ disabled }) => disabled === true && css`
      background: #AFB1B7;
      cursor: not-allowed;
      border-color: #AFB1B7;
      &:hover {
        background: #AFB1B7;
      }
    `}
  `};
  
  /* borderless */
  ${({ styling }) => styling === 'borderless' && css`
    background: ${(props) => (props.active ? '#E1E6EF' : 'white')};
    border: 1px solid transparent;
    color: '#333';
    &:hover {
      background: ${(props) => (props.loading ? 'white' : '#F0F3F8')};
    }
    ${({ disabled }) => disabled === true && css`
      background: white;
      color: #AFB1B7;
      cursor: not-allowed;
      border-color: transparent;
      &:hover {
        background: white;
        color: #AFB1B7;
      }
    `}
  `};

  /* transparent */
  ${({ styling }) => styling === 'transparent' && css`
    background: ${(props) => (props.active ? '#65A771' : 'transparent')};
    border: 1px solid ${(props) => props.theme.colors.buttonBorder};
    color: ${(props) => (props.active ? 'white' : props.theme.colors.green)};
    &:hover {
      color: white;
      background: ${(props) => (props.loading ? 'inherit' : props.theme.colors.buttonHover)};
    }
    ${({ disabled }) => disabled === true && css`
      background: white;
      color: #AFB1B7;
      cursor: not-allowed;
      border-color: #AFB1B7;
      &:hover {
        background: white;
        color: #AFB1B7;
      }
    `}
  `};

  /* grey */
  ${({ styling }) => styling === 'grey' && css`
    background: ${(props) => (props.active ? '#C6CCD5' : props.theme.colors.buttonGrey)};
    border: 1px solid ${(props) => props.theme.colors.buttonGrey};
    color: #333;
    &:hover {
      background: ${(props) => props.theme.colors.buttonGrey};
    }
    ${({ disabled }) => disabled === true && css`
      background: #E6E9EE;
      color: #AFB1B7;
      cursor: not-allowed;
      border-color: #E6E9EE;
      &:hover {
        background: #E6E9EE;
        color: #AFB1B7;
      }
    `}
  `};

  /* black transparent */
  ${({ styling }) => styling === 'black-transparent' && css`
    background: ${(props) => (props.active ? '#CACFD7' : 'white')};
    border: 1px solid ${(props) => props.theme.colors.buttonGrey};
    color: #333;
    &:hover {
      background: ${(props) => (props.loading ? 'white' : props.theme.colors.buttonGrey)};
    }
    ${({ disabled }) => disabled === true && css`
      background: #E6E9EE;
      color: #AFB1B7;
      cursor: not-allowed;
      border-color: #E6E9EE;
      &:hover {
        background: #E6E9EE;
        color: #AFB1B7;
      }
    `}
  `};

  ${({ styling }) => styling === 'green-borderless' && css`
    background: transparent;
    color: #61B16F;
    border-bottom: 1px solid #D0E5D8;
    border-radius: 0;
    padding: 0 !important;
    &:hover {
      color: #65A771;
    }
    &:focus {
      box-shadow: none;
    }
  `}

  ${({ styling }) => styling === 'danger' && css`
    background: #CB1409;
    color: white;
    &:hover {
      background: #f5160a;
    }
  `}
  

  ${({ small }) => small && css`
    padding: 0.25rem 0.8rem;
    min-width: auto;
  `}
`;

export const PreloaderWrap = styled.div`
  width: 100%;
  display: ${(props) => (props.loading ? 'inline-block' : 'none')};
  position: absolute;
  left: 0;
  top: 0.55rem;
  img {
    height: 1.2rem;
  }

  ${({ small }) => small && css`
    top: 0.35rem;
    img {
      height: 1rem;
    }
  `}
`;

export const TextWrap = styled.span`
  position: relative;
  left: ${(props) => (props.loading ? '-1000%' : '0')};
  opacity: ${(props) => (props.loading ? '0' : '1')};
  line-height: 1.5rem;
  white-space: nowrap;
  font-size: 14px;
`;

export const SortButtonWrap = styled(ButtonWrap)`
  background: #F5F7FB;
  border: 1px solid transparent;
  padding: 0;
  min-width: 0;
  width: 2.5rem;
  position: relative;
  &:focus {
    box-shadow: none;
  }
  &:hover {
    border-color: #C6CCD5;
    background: #F5F7FB;
  }
  &:after, &:before {
    content: '';
    position: absolute;
    width: 0; 
    height: 0; 
    left: calc(2.5rem/2 - 0.2rem);
    margin-left: calc(-0.2rem/2);
  }

  &:after {
    border-left: 0.2rem solid transparent;
    border-right: 0.2rem solid transparent;
    border-top: 0.2rem solid #333;
    bottom: 0.3rem;
  }

  &:before {
    top: 0.3rem;
    border-left: 0.2rem solid transparent;
    border-right: 0.2rem solid transparent;
    border-bottom: 0.2rem solid #333;
  }
`;

export const SortText = styled.span`
  line-height: 1.5rem;
  white-space: nowrap;
  display: inline-block;
  padding: 0.25rem 0;
`;

export const DotButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
  cursor: pointer;
  transition: all .2s ease-in;
  &:hover {
    >span {
      background: #333;
    }
  }
`;

export const Dot = styled.span`
  border-radius: 50%;
  background: #C8CCD6;
  margin-right: 0.125rem;
  width: 0.25rem;
  height: 0.25rem;
  transition: all .2s ease-in;
`;

export const IconButtonWrap = styled.div`
  display: flex;
  cursor: pointer;
  border-radius: 0.25rem;
  transition: all .2s ease-in;
  width: 1.8rem;
  height: 1.8rem;
  justify-content: center;
  align-items: center;
  img {
    max-width: 100%;
    max-height: 100%;
  }
  
  &:hover {
    background: ${(props) => !props.disabled && '#E8EBF1'};
  }

  ${({ styling }) => styling === 'grey' && css`
    background: #F5F7FB; 
    box-shadow: 0px 1px 2px #BEC3CB;
  `}

  ${({ disabled }) => disabled && css`
    cursor: not-allowed;
    opacity: 0.6;
  `}
`;

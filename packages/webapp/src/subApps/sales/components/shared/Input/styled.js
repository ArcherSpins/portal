import styled, { css } from 'styled-components';

export const InputWrap = styled.input`
  font-size: 1rem;
  border: 1px solid #C6CCD5;
  border-radius: 0.25rem;
  padding: 0.375rem 0.625rem;
  font-family: Proxima Nova;
  line-height: 1.5rem;
  outline: none;
  transition: all .2s ease-in;
  min-width: 10rem;
  width: 100%;
  &:::placeholder {
    color: #B1B1B1;
  }


  &:hover {
    border-color: hsl(0,0%,70%);
  }


  &:focus {
    border-color: ${(props) => props.theme.colors.green}
  }

  ${({ styling }) => styling === 'borderless' && css`
    border: none;
    border-radius: 0;
    border-bottom: 2px solid #E6E8EC;
    background: transparent;
  `}

  ${({ error }) => error && css`
    border-color: ${(props) => props.theme.colors.alert};
    &:focus {
      border-color: ${(props) => props.theme.colors.alert};
    }
  `}

  ${({ small }) => small && css`
    padding: 0.25rem 0.8rem;
  `}
`;

// export const SearchWrap = styled.div`
//   display: inline-flex;
//   align-items: center;
//   border: 1px solid #C6CCD5;
//   border-radius: 0.25rem;
//   transition: all .2s ease-in;
//   outline: none;
//   padding-right: 0.4rem;
//   width: 100%;
//   ${({ focused }) => focused && css`
//     border-color: ${props => props.theme.colors.green}
//   `}
// `;

export const SearchWrap = styled.div`
  display: inline-flex;
  align-items: center;
  /* border: 1px solid #C6CCD5; */
  border-radius: 0.25rem;
  transition: all .2s ease-in;
  outline: none;
  padding-right: 0.4rem;
  background: #E9EEF2;
  width: 100%;
  ${({ focused }) => focused && css`
    border-color: ${(props) => props.theme.colors.green}
  `}
`;

export const SearchIcon = styled.img`
  width: 1rem;
  height: 1rem;
  margin: 0 0.4rem;
`;

export const SearchInput = styled(InputWrap)`
  border: none;
  outline: none;
  padding-left: 0;
  padding-right: 0;
  background: #E9EEF2;
  max-height: 27px;
  width: 100%;
  min-width: 260px;
`;

export const Reset = styled.div`
  display: inline-block;
  cursor: pointer;
  transition: all .2s ease-in;
  line-height: 0;
  padding: 0.3rem;
  &:hover {
    background: #E1E6EE;
    border-radius: 0.25rem;
  }
`;

export const ResetIcon = styled.img`
  width: 0.8rem;
  height: 0.8rem;
`;

export const Label = styled.span`
  color: #333;
  display: inline-block;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
  font-weight: bold;
`;

export const Error = styled.p`
  color: ${(props) => props.theme.colors.alert};
  font-size: 0.8rem;
  line-height: 1.25rem;
  margin-top: 0.2rem;
  width: 100%;
`;

export const Container = styled.div`
  width: ${(props) => (props.width ? props.width : '100%')};
`;

export const Wrap = styled.div``;

export const SideLabel = styled.span``;

export const NumberInputWrap = styled(InputWrap)`
  min-width: auto;
`;

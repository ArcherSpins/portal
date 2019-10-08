import React from 'react';
import styled from 'styled-components';
import Nav from '../components/Nav/Nav';

const HeaderWrap = styled.header`
  background: ${(props) => props.theme.colors.black};
  padding: 0.4rem ${(props) => props.theme.containerOffset.x};
  grid-area: header;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

export const Header = () => (
  <HeaderWrap>
    <Nav />
  </HeaderWrap>
);

export default Header;

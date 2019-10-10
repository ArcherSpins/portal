import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Nav from '../components/Nav/Nav';
import { onSignOut } from '../redux/actions/auth';

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

const Header = (props) => (
  <HeaderWrap>
    <Nav {...props} />
  </HeaderWrap>
);

const mapStateToProps = (state) => state;

export default compose(
  withRouter,
  connect(mapStateToProps, { onSignOut }),
)(Header);

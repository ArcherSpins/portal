import React from 'react';
import Logo from '../Logo/Logo';
import {
  NavWrap,
  MainNav,
  Profile,
  Logout,
  NavLink,
} from './styled';

const Nav = () => (
  <NavWrap>
    <MainNav>
      <Logo />
      <NavLink active="true" to="/">CRM</NavLink>
      <NavLink to="/">Projects</NavLink>
      <NavLink to="/">Intranet 3</NavLink>
      <NavLink to="/">Intranet 4</NavLink>
      <NavLink to="/">Intranet 5</NavLink>
    </MainNav>
    <Profile>
      <NavLink to="/">Konstantin Konstantinopolsky</NavLink>
      <Logout>Log Out</Logout>
    </Profile>
  </NavWrap>
);

export default Nav;

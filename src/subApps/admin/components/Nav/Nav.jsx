// @flow
import React from 'react';
import type { Node } from 'react';
import Logo from '../Logo/Logo';
import {
  NavWrap,
  MainNav,
  Profile,
  Logout,
  // NavLink,
  Span,
} from './styled';

type Props = {
  onSignOut: () => void,
  user: {
    userData: {
      data: {
        name: string
      }
    }
  }
}

const Nav = (props: Props): Node => {
  const { onSignOut, user } = props;

  return (
    <NavWrap>
      <MainNav>
        <Logo />
        <Span>Admin panel</Span>
        <Span to="/">Projects</Span>
        <Span to="/">Intranet 3</Span>
        <Span to="/">Intranet 4</Span>
        <Span to="/">Intranet 5</Span>
      </MainNav>
      {
        user.userData && (
          <Profile>
            <Span>{user.userData.data.name}</Span>
            <Logout onClick={onSignOut}>Log Out</Logout>
          </Profile>
        )
      }
    </NavWrap>
  );
};

export default Nav;

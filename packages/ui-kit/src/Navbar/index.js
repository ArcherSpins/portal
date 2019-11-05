// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import Container from '../Container';
import logo from './logo.png';
import styles from './Navbar.module.scss';

type Props = {
  username: string,
  className?: string
}

const Navbar = ({ username, className }: Props) => (
  <nav className={classNames(styles.nav, className)}>
    <Container
      className={styles.container}
    >
      <div>
        <NavLink exact className={styles.logo} to="/">
          <img className={styles.logo} src={logo} alt="Logo" />
        </NavLink>
        <NavLink activeClassName={styles.active} className={styles.link} to="/sales">
          Sales
        </NavLink>
        <NavLink activeClassName={styles.active} className={styles.link} to="/projects">
          Projects
        </NavLink>
        <NavLink activeClassName={styles.active} className={styles.link} to="/admin">
          Admin panel
        </NavLink>
      </div>
      <div>
        <NavLink activeClassName={styles.active} className={styles.link} to="/profile">
          {username}
        </NavLink>
        <NavLink
          activeClassName={styles.active}
          className={styles.link}
          to="/auth/logout"
        >
          Log Out
        </NavLink>
      </div>
    </Container>
  </nav>
);

Navbar.defaultProps = {
  className: '',
};

export default Navbar;

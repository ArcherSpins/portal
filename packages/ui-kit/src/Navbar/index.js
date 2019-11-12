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
        <NavLink data-test="header__logo" exact className={styles.logo} to="/">
          <img className={styles.logo} src={logo} alt="Logo" />
        </NavLink>
        <NavLink data-test="header__sales-link" activeClassName={styles.active} className={styles.link} to="/sales">
          Sales
        </NavLink>
        <NavLink data-test="header__projects-link" activeClassName={styles.active} className={styles.link} to="/projects">
          Projects
        </NavLink>
        <NavLink data-test="header__admin-link" activeClassName={styles.active} className={styles.link} to="/admin">
          Admin panel
        </NavLink>
      </div>
      <div>
        <NavLink
          activeClassName={styles.active}
          className={styles.link}
          to="/profile"
          data-test="header__profile-link"
        >
          {username}
        </NavLink>
        <NavLink
          activeClassName={styles.active}
          className={styles.link}
          to="/auth/logout"
          data-test="header__logout"
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

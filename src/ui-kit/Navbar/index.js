// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from 'ui-kit';
import logo from './logo.png';
import styles from './Navbar.module.scss';


const Navbar = () => (
  <nav className={styles.nav}>
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
          Name UserName
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

export default Navbar;

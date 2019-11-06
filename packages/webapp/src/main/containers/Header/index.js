// @flow

import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Navbar } from 'ui-kit';
import { GET_SELF_INFO } from 'graphql/auth';
import styles from './Header.module.scss';

function Header() {
  // TODO: fix employee typing
  const { data } = useQuery<{selfInfo: { name: string } }, void>(GET_SELF_INFO, { fetchPolicy: 'network-only' });
  let username = '';
  if (data) {
    username = data.selfInfo.name;
  }
  return (
    <Navbar className={styles.navigation} username={username} />
  );
}

export default Header;

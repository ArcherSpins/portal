// @flow
import React, { Component } from 'react';
import history from 'utils/history';
import {
  Navbar, Button, ButtonWithProgress, H1, Input, Separator,
} from 'ui-kit';
import styles from './Login.module.scss';

type Props = {}

class Login extends Component<Props> {
  onLogin = () => {
    localStorage.setItem('isAuthenticated', JSON.stringify(true));
    history.push('/admin');
  }

  render() {
    return (
      <div className={styles.page}>
        <Navbar />
        <main className={styles.content}>
          <form className={styles.form}>
            <H1>Log In</H1>
            <Separator />
            <Input
              placeholder="emusk@sfxdx.ru"
              className={styles.input}
              label="Login"
            />
            <Input
              placeholder="Your password"
              className={styles.input}
              label="Password"
            />
            <div className={styles.actions}>
              <ButtonWithProgress className={styles.loginButton}>Log In</ButtonWithProgress>
            </div>
            <div className={styles.actions}>
              <Button className={styles.button} use="simple" size="sm">Forgot password?</Button>
            </div>
          </form>
        </main>
      </div>
    );
  }
}

export default Login;

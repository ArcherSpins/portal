// @flow
import React, { Component } from 'react';
import history from 'utils/history';
import client from 'utils/api';

import { SIGN_IN, type SignInResponse } from 'graphql/mutations/auth';
import {
  Button, ButtonWithProgress, H1, Input, Separator,
} from 'ui-kit';
import styles from './Login.module.scss';

type Props = {};

type State = {
  login: string,
  password: string,
  loading: boolean
}

class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      loading: false,
    };
  }

  onLogin = async () => {
    const { login, password } = this.state;
    this.setState({
      loading: true,
    });
    try {
      const { data } = await client.mutate<SignInResponse>({
        mutation: SIGN_IN,
        variables: {
          login,
          password,
        },
      });
      this.saveToken(data.signIn.accessToken);
      this.setState({
        loading: false,
      }, this.redirect);
      this.redirect();
    } catch (err) {
      this.setState({
        loading: false,
      });
    }
  }

  saveToken = (token: string) => {
    localStorage.setItem('token', token);
  }

  redirect = () => {
    history.push('/');
  }

  onInputChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }


  render() {
    const { login, password, loading } = this.state;
    return (
      <div className={styles.page}>
        <main className={styles.content}>
          <form onSubmit={this.onLogin} className={styles.form}>
            <H1>Log In</H1>
            <Separator />
            <Input
              placeholder="emusk@sfxdx.ru"
              className={styles.input}
              value={login}
              label="Login"
              name="login"
              onChange={this.onInputChange}
            />
            <Input
              placeholder="Your password"
              className={styles.input}
              value={password}
              type="password"
              name="password"
              label="Password"
              onChange={this.onInputChange}
            />
            <div className={styles.actions}>
              <ButtonWithProgress
                loading={loading}
                className={styles.loginButton}
                onClick={this.onLogin}
              >
                Log In
              </ButtonWithProgress>
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

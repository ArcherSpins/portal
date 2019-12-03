// @flow
import React, { Component } from 'react';
import {
  Formik, Form, type FormikActions, FormikValues,
} from 'formik';
import history from 'utils/history';
import client from 'utils/api';
import { AUTH_TOKEN_KEY, ROOT_PAGE_ROUTE } from 'utils/constants';

import { SIGN_IN, type SignInResponse } from 'graphql/auth';
import {
  ButtonWithProgress, H1, Input, Separator, LinkButton,
} from '@sfxdx/ui-kit';
import createTestContext from 'utils/createTestContext';
import styles from '../Auth.module.scss';

const createTestAttr = createTestContext('auth');

type Props = {};

class Login extends Component<Props> {
  onLogin = async (values: FormikValues, { setSubmitting }: FormikActions) => {
    const { login, password } = values;
    setSubmitting(true);
    try {
      const { data } = await client.mutate<SignInResponse>({
        mutation: SIGN_IN,
        variables: {
          login,
          password,
        },
      });
      this.saveToken(data.signIn.accessToken);
      setSubmitting(false);
      this.redirect();
    } catch (err) {
      setSubmitting(false);
      // console.log(err);
    }
  }

  saveToken = (token: string) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }

  redirect = () => {
    history.push(ROOT_PAGE_ROUTE);
  }

  onInputChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }


  render() {
    return (
      <div className={styles.page}>
        <main className={styles.content}>
          <Formik
            initialValues={{ login: '', password: '' }}
            validate={(values) => {
              const errors = {};
              if (!values.login) {
                errors.login = 'Required';
              }

              if (!values.password) {
                errors.password = 'Required';
              }
              return errors;
            }}
            onSubmit={this.onLogin}
          >
            {({
              values,
              errors,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              isValid,
            }) => (
              <Form className={styles.form}>
                <H1>Log In</H1>
                <Separator />
                <Input
                  placeholder="emusk@sfxdx.ru"
                  className={styles.input}
                  value={values.login}
                  label="Login"
                  name="login"
                  error={touched.login && errors.login}
                  onChange={handleChange}
                  data-test={createTestAttr('login-input')}
                />
                <Input
                  placeholder="Your password"
                  className={styles.input}
                  value={values.password}
                  type="password"
                  name="password"
                  error={touched.login && errors.password}
                  label="Password"
                  onChange={handleChange}
                  data-test={createTestAttr('password-input')}
                />
                <div className={styles.actions}>
                  <ButtonWithProgress
                    loading={isSubmitting}
                    className={styles.loginButton}
                    onClick={handleSubmit}
                    disabled={!isValid}
                    type="submit"
                    data-test={createTestAttr('login-button')}
                  >
                    Log In
                  </ButtonWithProgress>
                </div>
                <div className={styles.actions}>
                  <LinkButton
                    className={styles.button}
                    data-test={createTestAttr('forgot-password-link')}
                    to="/auth/reset-password"
                    size="sm"
                  >
                    Forgot password?
                  </LinkButton>
                </div>
              </Form>
            )}
          </Formik>
        </main>
      </div>
    );
  }
}

export default Login;

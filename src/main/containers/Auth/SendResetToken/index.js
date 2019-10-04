// @flow
import React, { Component } from 'react';
import { Formik, type FormikActions, FormikValues } from 'formik';
import history from 'utils/history';
import client from 'utils/api';
import { AUTH_TOKEN_KEY, ROOT_PAGE_ROUTE } from 'utils/constants';

import { RESET_PASSWORD_INIT } from 'graphql/mutations/auth';
import {
  ButtonWithProgress, H1, Input, Separator,
} from 'ui-kit';
import styles from '../Auth.module.scss';

type Props = {};

class SendResetToken extends Component<Props> {
  onReset = async (values: FormikValues, { setSubmitting }: FormikActions) => {
    const { login, password } = values;
    setSubmitting(true);
    try {
      await client.mutate<void>({
        mutation: RESET_PASSWORD_INIT,
        variables: {
          login,
          password,
        },
      });
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
            initialValues={{ login: '' }}
            validate={(values) => {
              const errors = {};
              if (!values.login) {
                errors.login = 'Required';
              }

              return errors;
            }}
            onSubmit={this.onReset}
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
              <form onSubmit={handleSubmit} className={styles.form}>
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
                />
                <div className={styles.actions}>
                  <ButtonWithProgress
                    loading={isSubmitting}
                    className={styles.loginButton}
                    onClick={handleSubmit}
                    disabled={!isValid}
                  >
                    Recover
                  </ButtonWithProgress>
                </div>
              </form>
            )}
          </Formik>
        </main>
      </div>
    );
  }
}

export default SendResetToken;

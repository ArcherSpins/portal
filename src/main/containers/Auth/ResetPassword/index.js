// @flow
import React, { Component } from 'react';
import { Formik, type FormikActions, FormikValues } from 'formik';
import { type Match } from 'react-router-dom';

import history from 'utils/history';
import client from 'utils/api';
import { AUTH_TOKEN_KEY, ROOT_PAGE_ROUTE } from 'utils/constants';

import { SET_NEW_PASSWORD } from 'graphql/auth';
import {
  ButtonWithProgress, H1, Input, Separator,
} from 'ui-kit';
import styles from '../Auth.module.scss';

type Props = {
  match: Match
};

class ResetPassword extends Component<Props> {
  onReset = async (values: FormikValues, { setSubmitting }: FormikActions) => {
    const { match } = this.props;
    const { token } = match.params;
    const { newPassword } = values;

    setSubmitting(true);
    try {
      await client.mutate<void>({
        mutation: SET_NEW_PASSWORD,
        variables: {
          token,
          newPassword,
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
            initialValues={{ newPassword: '', oldPassword: '' }}
            validate={(values) => {
              const errors = {};
              if (!values.newPassword) {
                errors.newPassword = 'Required';
              }

              if (!values.oldPassword) {
                errors.oldPassword = 'Required';
              }

              if (values.newPassword !== values.oldPassword) {
                errors.confirm = 'passwords don\'t match';
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
              handleBlur,
              isValid,
            }) => (
              <form onSubmit={handleSubmit} className={styles.form}>
                <H1>Set new password</H1>
                <Separator />
                <Input
                  placeholder="Your new password"
                  className={styles.input}
                  value={values.newPassword}
                  label="New password"
                  name="newPassword"
                  type="password"
                  onBlur={handleBlur}
                  error={touched.newPassword && errors.newPassword}
                  onChange={handleChange}
                />
                <Input
                  placeholder="Repeat your new password"
                  className={styles.input}
                  value={values.oldPassword}
                  label="Repeat password"
                  name="oldPassword"
                  onBlur={handleBlur}
                  type="password"
                  error={touched.oldPassword && errors.oldPassword}
                  onChange={handleChange}
                />
                {touched.newPassword && touched.oldPassword && errors.confirm}
                <div className={styles.actions}>
                  <ButtonWithProgress
                    loading={isSubmitting}
                    className={styles.loginButton}
                    onClick={handleSubmit}
                    disabled={!isValid}
                  >
                    Save
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

export default ResetPassword;

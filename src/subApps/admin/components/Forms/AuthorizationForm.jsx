/* eslint-disable react/no-unused-state */
// @flow
import React, { useState } from 'react';
import {
  FieldBlock,
  InputForm,
  Label,
  AuthForm,
  SubmitButton,
  TitleForm,
  ContainerForm,
  LinkToggle,
} from './styled';

type AuthFormProps = {
  onSubmit: ({
    login: string,
    password: string
  }) => void,
  validate: boolean,
  getError: ({status: boolean, message: string}) => {status: boolean, message: string},
  toggleResetPassword: (boolean) => void
}

export default ({
  onSubmit,
  validate,
  getError,
  toggleResetPassword,
}: AuthFormProps) => {
  const [login, changeLogin] = useState('');
  const [password, changePassword] = useState('');

  const [
    { loginError, passwordError },
    toggleError,
  ] = useState({ loginError: false, passwordError: false });

  const validateFunc = () => {
    if (login === '' || password === '') {
      let loginStatus = false;
      let passwordStatus = false;

      if (login === '') {
        loginStatus = true;
      }

      if (password === '') {
        passwordStatus = true;
      }

      toggleError({
        loginError: loginStatus,
        passwordError: passwordStatus,
      });
      getError({ status: true, message: 'The - all the fields !' });
      return;
    }
    toggleError({
      loginError: false,
      passwordError: false,
    });

    onSubmit({
      login,
      password,
    });
  };

  const submitForm = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validate) {
      validateFunc();
    } else {
      onSubmit({
        login,
        password,
      });
    }
  };

  return (
    <ContainerForm>
      <AuthForm onSubmit={submitForm}>
        <TitleForm>Log In</TitleForm>
        <FieldBlock>
          <Label>Login</Label>
          <InputForm
            name="login-auth"
            id="login-auth"
            placeholder="Login"
            value={login}
            onChange={(e) => {
              changeLogin(e.target.value);
            }}
            style={{ borderColor: loginError && '#DF160A' }}
          />
        </FieldBlock>
        <FieldBlock>
          <Label>Password</Label>
          <InputForm
            name="password-auth"
            id="password-auth"
            placeholder="Your password"
            type="password"
            value={password}
            onChange={(e) => {
              changePassword(e.target.value);
            }}
            style={{ borderColor: passwordError && '#DF160A' }}
          />
        </FieldBlock>
        <SubmitButton
          type="submit"
          onClick={submitForm}
          center
        >
          Log In
        </SubmitButton>
        <LinkToggle
          onClick={() => toggleResetPassword(true)}
        >
          Forgot password?
        </LinkToggle>
      </AuthForm>
    </ContainerForm>
  );
};

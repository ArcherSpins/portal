/* eslint-disable react/no-unused-state */
// @flow
import React, { useState } from 'react';
import {
  FieldBlock,
  InputForm,
  Label,
  AuthForm,
} from './styled';
import Button from '../shared/Button/Button';

type AuthFormProps = {
  onSubmit: ({
    login: string,
    password: string
  }) => void,
  validate: boolean
}

export default ({
  onSubmit,
  validate,
}: AuthFormProps) => {
  const [login, changeLogin] = useState('');
  const [password, changePassword] = useState('');

  const submitForm = (e: any) => {
    e.preventDefault();
    if (validate) {
      onSubmit({
        login,
        password,
      });
    }
  };

  return (
    <AuthForm onSubmit={submitForm}>
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
        />
      </FieldBlock>
      <FieldBlock>
        <Label>Password</Label>
        <InputForm
          name="password-auth"
          id="password-auth"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            changePassword(e.target.value);
          }}
        />
      </FieldBlock>
      <Button
        text="Submit"
        type="submit"
        onClick={submitForm}
      />
    </AuthForm>
  );
};

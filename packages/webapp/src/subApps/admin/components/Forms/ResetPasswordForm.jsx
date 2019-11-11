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
} from './styled';

type ResetFormProps = {
  onSubmit: ({
    login: string
  }) => void,
  validate: boolean,
  getError: ({status: boolean, message: string}) => {status: boolean, message: string}
}

export default ({
  onSubmit,
  validate,
  getError,
}: ResetFormProps) => {
  const [login, changeLogin] = useState('');
  const [loginError, toggleError] = useState(false);

  const submitForm = (e: SyntheticEvent<HTMLButtonElement>): boolean => {
    e.preventDefault();
    if (validate) {
      if (login === '') {
        toggleError(true);
        getError({ status: true, message: 'Fill login is required!' });
        return false;
      }
    }
    onSubmit({
      login,
    });
    return true;
  };

  return (
    <ContainerForm>
      <AuthForm onSubmit={submitForm}>
        <TitleForm>Reset Password</TitleForm>
        <FieldBlock>
          <Label>Login</Label>
          <InputForm
            name="login-repeat"
            id="login-repeat"
            placeholder="Login"
            value={login}
            onChange={(e) => {
              changeLogin(e.target.value);
            }}
            style={{ borderColor: loginError && '#DF160A' }}
          />
        </FieldBlock>
        <SubmitButton
          type="submit"
          onClick={submitForm}
          center
        >
          Recover
        </SubmitButton>
      </AuthForm>
    </ContainerForm>
  );
};

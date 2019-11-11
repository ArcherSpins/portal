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


type NewPasswordPropd = {
  onSubmit: ({
    password: string
  }) => void,
  validate: boolean,
  getError: ({status: boolean, message: string}) => {status: boolean, message: string},
}

export default ({
  onSubmit,
  validate,
  getError,
}: NewPasswordPropd) => {
  const [password, changePassword] = useState('');
  const [repeatPassword, changeRepeatPassword] = useState('');

  const [
    { passwordError, repeatPasswordError },
    toggleError,
  ] = useState({ passwordError: false, repeatPasswordError: false });

  const validateFunc = (): { status: boolean, message: string } | boolean => {
    if (password === '' || repeatPassword === '') {
      let passwordStatus = false;
      let repeatPasswordStatus = false;
      if (password === '') {
        passwordStatus = true;
      }

      if (repeatPassword === '') {
        repeatPasswordStatus = true;
      }

      toggleError({
        passwordError: passwordStatus,
        repeatPasswordError: repeatPasswordStatus,
      });

      return getError({ status: true, message: 'Fill in all fields!' });
    }

    if (password !== repeatPassword) {
      return getError({ status: true, message: 'Passwords don`t match' });
    }

    toggleError({
      passwordError: false,
      repeatPasswordError: false,
    });

    onSubmit({
      password,
    });

    return false;
  };

  const submitForm = (e: SyntheticEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (validate) {
      validateFunc();
    } else {
      onSubmit({
        password,
      });
    }
  };

  return (
    <ContainerForm>
      <AuthForm onSubmit={submitForm}>
        <TitleForm>Log In</TitleForm>
        <FieldBlock>
          <Label>New password</Label>
          <InputForm
            name="password-reset"
            id="password-reset"
            placeholder="Your new password"
            value={password}
            onChange={(e) => {
              changePassword(e.target.value);
            }}
            style={{ borderColor: passwordError && '#DF160A' }}
          />
        </FieldBlock>
        <FieldBlock>
          <Label>Repeat password</Label>
          <InputForm
            name="password-reset-repeat"
            id="password-aureset-repeatth"
            placeholder="Repeat your new password"
            value={repeatPassword}
            onChange={(e) => {
              changeRepeatPassword(e.target.value);
            }}
            style={{ borderColor: repeatPasswordError && '#DF160A' }}
          />
        </FieldBlock>
        <SubmitButton
          type="submit"
          onClick={submitForm}
          center
        >
          Log In
        </SubmitButton>
      </AuthForm>
    </ContainerForm>
  );
};

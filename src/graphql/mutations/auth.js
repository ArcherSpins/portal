// @flow
import { gql } from 'apollo-boost';

// eslint-disable-next-line import/prefer-default-export
export const SIGN_IN = gql`
  mutation signIn($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      accessToken
    }
  }
`;

export const RESET_PASSWORD_INIT = gql`
  mutation initiateResetPasswordProcedure($login: String!) {
    initiateResetPasswordProcedure(login: $login)
  }
`;

export const SET_NEW_PASSWORD = gql`
  mutation resetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;

export type SignInResponse = {
  signIn: {
    accessToken: string
  }
}

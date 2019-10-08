// @flow
// $FlowFixMe
import gql from 'graphql-tag';

export const SIGN_IN = gql`
  mutation signIn($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      accessToken
    }
  }
`;

export const SIGN_OUT = gql`
  mutation {
    signOut
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

export const GET_SELF_INFO = gql`
  query {
    selfInfo {
      id
      name
    }
  }
`;

export type SignInResponse = {
  signIn: {
    accessToken: string
  }
}

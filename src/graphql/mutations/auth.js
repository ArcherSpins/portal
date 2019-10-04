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

export type SignInResponse = {
  signIn: {
    accessToken: string
  }
}

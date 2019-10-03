/* eslint-disable import/prefer-default-export */
import gql from 'apollo-boost';

export const SIGN_IN = gql`
  mutation signIn($login: String!, $password: String!) {
    signIn(login: $type, password: $password) {
      accessToken
    }
  }
`;

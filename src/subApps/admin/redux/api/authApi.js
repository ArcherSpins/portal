// @flow
import type { FetchResult } from 'apollo-link';
import { client } from '../../graphql/client';
import {
  signIn as signInMutation,
  getUserData,
  signOut,
} from '../../graphql/queries';
import type { Employees } from '../../types';

type Response = {
  signIn: {
    accessToken: string,
    refreshToken: string,
    type: string
  }
}

export async function getToken(params: {
  username: string,
  password: string
}): Promise<FetchResult<Response>> {
  const { username, password } = params;
  try {
    const response = await client.mutate({
      mutation: signInMutation,
      variables: {
        login: username,
        password,
      },
    });
    const { data } = response;
    const { signIn } = data;
    const { accessToken } = signIn;
    return accessToken;
  } catch (err) {
    throw new Error(err.message);
  }
}

type CheckTokenType = {
  data: Employees
} | boolean;

export async function checkToken(): Promise<FetchResult<CheckTokenType>> {
  try {
    const response = await client.query({
      query: getUserData,
    });
    return { data: response.data.selfInfo };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function fetchSignOut() {
  try {
    await client.mutate({
      mutation: signOut,
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

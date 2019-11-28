// @flow
import type { FetchResult } from 'apollo-link';
import client from 'utils/api';
import { initialResetPassword, resetPassword } from '../../graphql/queries';

type Response = {
  initiateResetPasswordProcedure: string
}

export async function fetchInitialResetPassword(params: {
  login: string
}): Promise<FetchResult<Response>> {
  const { login } = params;
  try {
    const response = await client.mutate({
      mutation: initialResetPassword,
      variables: {
        login,
      },
    });
    return response.data.initiateResetPasswordProcedure;
  } catch (err) {
    throw new Error(err);
  }
}

export async function fetchResetPassword(params: {
  password: string,
  token: string
}): Promise<FetchResult<Response>> {
  const { password, token } = params;
  try {
    const response = await client.mutate({
      mutation: resetPassword,
      variables: {
        newPassword: password,
        token,
      },
    });
    // const { data } = response;
    // const { signIn } = data;
    // const { accessToken } = signIn;
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
}

// @flow
import type {
  AuthAction,
  LogoutRequestType,
  InitialResetPassword,
  ResetPassword,
} from './types';
// import type { Employees } from '../../types';

export const loginRequest = (username: string, password: string): AuthAction => ({
  type: 'LOGIN_REQUEST',
  payload: {
    username,
    password,
  },
});

export const checkAuth = (): AuthAction => ({
  type: 'CHECK_AUTH_REQUEST',
});

export const initialResetPassword = (login: string): InitialResetPassword => ({
  type: 'INITIAL_RESET_PASSWORD',
  payload: login,
});

export const setErrorPassword = (message: string): InitialResetPassword => ({
  type: 'SET_INITIAL_RESET_PASSWORD_FAIL',
  payload: message,
});

export const turnErrorPassword = (): InitialResetPassword => ({
  type: 'SET_INITIAL_RESET_PASSWORD_SUCCESS',
});

export const checkTokenAction = (location: string) => ({
  type: 'CHECK_AUTH_REQUEST',
  payload: location,
});

// reset password

export const resetPassword = (password: string, token: string): ResetPassword => ({
  type: 'REQUEST_RESET_PASSWORD',
  payload: {
    password,
    token,
  },
});

export const onSignOut = (): LogoutRequestType => ({
  type: 'LOGOUT_REQUEST',
});

// @flow
export type Error = {
  message: string
};

export type ErrorState = {};

export type ErrorAction =
  | { type: "CLEAR_ERRORS" }
  | { type: "GET_ERRORS", payload: Error };

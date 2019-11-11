// @flow

export type SetErrorFormType = {
  type: 'SET_ERROR_FORM',
  payload: {
    key: string,
    message: string,
  }
}

function setErrorForm(key: string, message: string): SetErrorFormType {
  return {
    type: 'SET_ERROR_FORM',
    payload: {
      key,
      message,
    },
  };
}

export type DeleteErrorFormType = {
  type: 'DELETE_ERROR_FORM',
  payload: {
    key: string,
  }
}

function deleteErrorForm(key: string): DeleteErrorFormType {
  return {
    type: 'DELETE_ERROR_FORM',
    payload: {
      key,
    },
  };
}

export type OpenErrorAlertType = {
  type: 'OPEN_ERROR_ALERT',
  payload: string
}

export type CloseErrorAlertType = {
  type: 'CLOSE_ERROR_ALERT',
}

export const closeErrorAlert = (): CloseErrorAlertType => ({
  type: 'CLOSE_ERROR_ALERT',
});

export type ReducerErrrorCreate =
  SetErrorFormType |
  DeleteErrorFormType |
  OpenErrorAlertType |
  CloseErrorAlertType;

export {
  setErrorForm,
  deleteErrorForm,
};

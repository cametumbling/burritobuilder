import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDdlTayPw-029d739AtjxKrT0oEGd2_B7c';
    if (!isSignUp) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDdlTayPw-029d739AtjxKrT0oEGd2_B7c';
    }
    axios.post(url, authData)
      .then(response => {
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

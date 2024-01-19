import axios from 'axios';

// Action Types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const UPDATE_EMAIL_SUCCESS = 'UPDATE_EMAIL_SUCCESS';
export const UPDATE_EMAIL_FAILURE = 'UPDATE_EMAIL_FAILURE';
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_FAILURE = 'UPDATE_PASSWORD_FAILURE';
export const EMAIL_UPDATED = 'EMAIL_UPDATED';
export const PASSWORD_UPDATED = 'PASSWORD_UPDATED';
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'; 

// Action Creators
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

export const updateEmailSuccess = () => ({
  type: UPDATE_EMAIL_SUCCESS,
});

export const updateEmailFailure = (error) => ({
  type: UPDATE_EMAIL_FAILURE,
  payload: error,
});

export const updatePasswordSuccess = () => ({
  type: UPDATE_PASSWORD_SUCCESS,
});

export const updatePasswordFailure = (error) => ({
  type: UPDATE_PASSWORD_FAILURE,
  payload: error,
});

export const updateUserInfo = (userInfo) => ({ 
  type: UPDATE_USER_INFO,
  payload: userInfo,
});

export const loginUser = (email, password) => {
  return async (dispatch) => {
    dispatch(loginRequest());

    try {
      const response = await axios.post('http://localhost:9000/api/login', {
        email,
        password,
      });

      const user = response.data;

      dispatch(loginSuccess(user));
    } catch (error) {
      const errorMessage = error.response.data.message || 'Incorrect Username or password.';
      dispatch(loginFailure(errorMessage));
      throw new Error(errorMessage); // Throw the error to be caught in handleLogin
    }
  };
};

export const updateEmail = (userId, password, email) => {
  return async (dispatch) => {
    try {
      const response = await axios.put('http://localhost:9000/api/updateEmail', {  userId, password, email});
      dispatch({ type: EMAIL_UPDATED , payload: response.data });
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };
};

export const updatePassword = (userId, password, newPassword) => {
  return async (dispatch) => {
    try {
      const response = await axios.put('http://localhost:9000/api/updatePassword', { userId, password, newPassword });
      dispatch({ type: PASSWORD_UPDATED , payload: response.data });
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };
};

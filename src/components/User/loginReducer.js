import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    UPDATE_EMAIL_FAILURE,
    UPDATE_PASSWORD_FAILURE,
    LOGOUT,
    EMAIL_UPDATED,
     PASSWORD_UPDATED,
     UPDATE_USER_INFO,
  } from './loginActions';
  
  const initialState = {
    user: null,
    isLoggedIn: false,
    loading: false,
    loginError: null,
    updateEmailError: null,
    updatePasswordError: null,
  };
  
  const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
          loginError: null,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          user: action.payload,
          isLoggedIn: true,
          loading: false,
          loginError: null,
        };
      case LOGIN_FAILURE:
        return {
          ...state,
          loading: false,
          loginError: action.payload,
        };
      case UPDATE_EMAIL_FAILURE:
        return {
          ...state,
          updateEmailError: action.payload,
        };
      case UPDATE_PASSWORD_FAILURE:
        return {
          ...state,
          updatePasswordError: action.payload,
        };
      case LOGOUT:
        return {
          ...initialState,
          cart: [],
        };
      case EMAIL_UPDATED:
        return {
          ...state,
          user_info: {
          ...state.user_info,
          email: action.payload.email,
          },
          };
      case PASSWORD_UPDATED:
        return state;
      
      case UPDATE_USER_INFO: 
        return {
          ...state,
          user: {
            ...state.user,
            ...action.payload,
          },
        };
      default:
        return state;
    }
  };
  
  export default loginReducer;
  
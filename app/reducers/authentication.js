import {
  TYPE_AUTHENTICATION_LOADING,
  TYPE_AUTHENTICATION_LOGIN_ERROR,
  TYPE_AUTHENTICATION_LOGIN_SUCCESS,
  TYPE_AUTHENTICATION_LOGOUT,
  TYPE_AUTHENTICATION_CLEAR,
  TYPE_AUTHENTICATION_ERROR
} from '../actions/authentication';

const initialState = {
  loading: false,
  isAuthenticated: false,
  loginSuccess: false,
  loginError: false, // Errors returned from server side
  errorMessage: null, // Errors returned from server side
  redirectMessage: null,
  sessionHasBeenFetched: false,
  idToken: null,
  logoutUrl: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE_AUTHENTICATION_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case TYPE_AUTHENTICATION_LOGIN_ERROR:
      return {
        ...initialState,
        errorMessage: action.payload,
        isAuthenticated: false,
        loginError: true
      };
    case TYPE_AUTHENTICATION_LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        sessionHasBeenFetched: true,
        loginSuccess: true,
        idToken: action.payload.access_token
      };
    case TYPE_AUTHENTICATION_LOGOUT:
      return {
        ...initialState,
      };
    case TYPE_AUTHENTICATION_ERROR:
      return {
        ...initialState,
        redirectMessage: action.payload
      };
    case TYPE_AUTHENTICATION_CLEAR:
      return {
        ...state,
        loading: false,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

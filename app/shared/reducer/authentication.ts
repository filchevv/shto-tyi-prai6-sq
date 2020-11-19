import axios from 'axios';

import {REQUEST, SUCCESS, FAILURE} from '../../utils/action-type.util';

export const ACTION_TYPES = {
  LOGIN: 'authentication/LOGIN',
  LOGOUT: 'authentication/LOGOUT',
  CLEAR_AUTH: 'authentication/CLEAR_AUTH',
  ERROR_MESSAGE: 'authentication/ERROR_MESSAGE'
};

const initialState = {
  loading: false,
  isAuthenticated: false,
  username: "",
  password: "",
  loginSuccess: false,
  loginError: false, // Errors returned from server side
  errorMessage: null as unknown as string, // Errors returned from server side
  redirectMessage: null as unknown as string,
  sessionHasBeenFetched: false,
  idToken: null as unknown as string,
  logoutUrl: null as unknown as string
};

export type AuthenticationState = Readonly<typeof initialState>;

// Reducer
export default (state: AuthenticationState = initialState, action: any): AuthenticationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.LOGIN):
      return {
        ...state,
        loading: true
      };
    case FAILURE(ACTION_TYPES.LOGIN):
      return {
        ...initialState,
        errorMessage: action.payload,
        isAuthenticated: false,
        loginError: true
      };
    case SUCCESS(ACTION_TYPES.LOGIN):
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        sessionHasBeenFetched: true,
        loginSuccess: true,
        idToken: action.payload.access_token
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...initialState,
      };

    case ACTION_TYPES.ERROR_MESSAGE:
      return {
        ...initialState,
        redirectMessage: action.message
      };
    case ACTION_TYPES.CLEAR_AUTH:
      return {
        ...state,
        loading: false,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export const displayAuthError = (message: any) => ({type: ACTION_TYPES.ERROR_MESSAGE, message});

export const login = (username: any, password: any) => async (dispatch: any) => {
  const data = {
    userName: username,
    password: password
  };
  axios.post(
    'http://localhost:9000/api/user/oauth/token',
    data,
    {headers: {'Content-Type': 'application/json'}}
  )
    .catch(function (error) {
      dispatch({
        type: FAILURE(ACTION_TYPES.LOGIN),
        payload: error
      })
    })
    .then(res => {
      console.log(res)
      dispatch({
        type: SUCCESS(ACTION_TYPES.LOGIN),
        payload: res.data
      })
    });
};

export const logout = () => async (dispatch: any) => {
  let payload = axios.post('api/logout', {})
  console.log(payload)
  await dispatch({
    type: ACTION_TYPES.LOGOUT,
    payload: payload
  });
};

export const clearAuthentication = (messageKey: any) => (dispatch: any) => {
  dispatch(displayAuthError(messageKey));
  dispatch({
    type: ACTION_TYPES.CLEAR_AUTH
  });
};

import axios from "axios";

export const TYPE_AUTHENTICATION_LOADING = 'authentication.loading';
export const TYPE_AUTHENTICATION_LOGIN_ERROR = 'authentication.login.error';
export const TYPE_AUTHENTICATION_LOGIN_SUCCESS = 'authentication.login.success';
export const TYPE_AUTHENTICATION_LOGOUT = 'authentication.logout';
export const TYPE_AUTHENTICATION_CLEAR = 'authentication.clear';
export const TYPE_AUTHENTICATION_ERROR = 'authentication.error';

export const loadingAction = isLoading => ({
  type: TYPE_AUTHENTICATION_LOADING,
  payload: isLoading,
});

export const displayAuthErrorAction = message => ({
  type: TYPE_AUTHENTICATION_ERROR,
  payload: message,
});

export const loginAction = (username, password) => async dispatch => {
  try {
    const { data } = await axios.post('http://localhost:9000/api/user/oauth/token', {
      userName: username,
      password: password,
    });
    dispatch({
      type: TYPE_AUTHENTICATION_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: TYPE_AUTHENTICATION_LOGIN_ERROR,
      payload: e.message || e,
    })
  }
};

export const logoutAction = () => async dispatch => {
  try {
    let payload = await axios.get('api/logout');
    await dispatch({
      type: TYPE_AUTHENTICATION_LOGOUT,
      payload,
    });
  } catch (e) {
    // ToDo: add error handling here
  }
};

export const clearAuthenticationAction = messageKey => dispatch => {
  dispatch(displayAuthErrorAction(messageKey));
  dispatch({
    type: TYPE_AUTHENTICATION_CLEAR,
  });
};

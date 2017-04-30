import axios from 'axios';

export const PASSWORD_TOGGLE = 'PASSWORD_TOGGLE';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const showPassword = () => ({
  type: PASSWORD_TOGGLE,
});

export const loginSuccess = ({ data }) => (
  (dispatch) => {
    localStorage.setItem('token', data.token);
    dispatch({ type: LOGIN_SUCCESS });
  }
);

export const loginFail = error => ({
  type: LOGIN_FAILURE,
  error,
});

export const loginRequest = credentials => (
  (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    axios.post('/api/authenticate', credentials)
      .then(response => dispatch(loginSuccess(response)))
      .catch(error => dispatch(loginFail(error)));
  }
);

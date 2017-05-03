import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const PASSWORD_TOGGLE = 'PASSWORD_TOGGLE';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const showPassword = () => ({
  type: PASSWORD_TOGGLE,
});

export const loginSuccess = ({ data }) => (
  (dispatch) => {
    dispatch({
      type: LOGIN_SUCCESS,
      user: jwtDecode(data.token),
    });
  }
);

export const loginFail = error => ({
  type: LOGIN_FAILURE,
  error,
});

export const logout = () => {
  delete localStorage.getItem('authorization');
  return {
    type: 'LOGOUT',
  };
};

export const loginRequest = (credentials) => {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: `email=${credentials.email}&password=${credentials.password}`,
  };

  return (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    axios('api/authenticate', config)
      .then((response) => {
        if (response.data.token === 'undefined') {
          return dispatch(loginFail(error));
        }
        localStorage.setItem('authorization', response.data.token);
        dispatch(loginSuccess(response));
      })
      .catch(error => dispatch(loginFail(error)));
  };
};

// export function loginUser(credentials) {

//   let config = {
//     method: 'POST',
//     headers: { 'Content-Type':'application/x-www-form-urlencoded' },
//     body: `email=${credentials.email}&password=${credentials.password}`
//   }

//   return dispatch => {
//     // We dispatch requestLogin to kickoff the call to the API
//     dispatch(requestLogin(credentials))

//     return fetch('http://localhost:3001/sessions/create', config)
//       .then(response =>
//         response.json()
//         .then(user => ({ user, response })
//       )
//     )
//     .then(({ user, response }) =>  {
//       if (!response.ok) {
//         // If there was a problem, we want to
//         // dispatch the error condition
//         dispatch(loginError(user.message))
//         return Promise.reject(user)
//       } else {
//         // If login was successful, set the token in local storage
//         localStorage.setItem('id_token', user.id_token)
//         localStorage.setItem('id_token', user.access_token)
//         // Dispatch the success action
//         dispatch(receiveLogin(user))
//       }
//     }).catch(err => console.log("Error: ", err))
//   }
// }

import jwtDecode from 'jwt-decode';

import { PASSWORD_TOGGLE, LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from '../actions/loginActions';

// Initial State
const initialState = (token => ({
  currentUser: token ? jwtDecode(token) : null,
  errorMessage: null,
  isAuthenticating: false,
  passwordToggle: false,
}))(localStorage.getItem('authorization'));

// const initialState = {
//   currentUser: null,
//   errorMessage: null,
//   isAuthenticating: false,
//   passwordToggle: false,
// };

const login = (state = initialState, action) => {
  switch (action.type) {
    case PASSWORD_TOGGLE:
      return {
        ...state,
        passwordToggle: !state.passwordToggle,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticating: true,
        isLoggedIn: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        errorMessage: action.errorMessage,
        isAuthenticating: false,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        currentUser: action.user,
        errorMessage: null,
        isAuthenticating: false,
        isLoggedIn: true,
      };
    case LOGOUT:
      return {
        errorMessage: null,
        isAuthenticating: false,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default login;

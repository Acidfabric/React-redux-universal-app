import { TOGGLE_PASSWORD_VISABILITY } from '../actions/index';

// Initial State
const initialState = {
  showPass: false,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_PASSWORD_VISABILITY:
      return {
        showPass: !state.showPass,
      };

    default:
      return state;
  }
};

// Export Reducer
export default login;

/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import login from './login';

// Combine all reducers into one root reducer
const rootReducer = combineReducers({
  login,
});

export default rootReducer;

/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import counter from './counterReducer';
import login from './loginReducer';

// Combine all reducers into one root reducer
const rootReducer = combineReducers({
  counter,
  login,
});

export default rootReducer;

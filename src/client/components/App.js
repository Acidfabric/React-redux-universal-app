import React from 'react';
// import PropTypes from 'prop-types';

import Dashboard from './Dashboard';
import LoginContainer from '../containers/LoginContainer';

const App = () => {
  const isLoggedIn = false;
  if (isLoggedIn) {
    return <Dashboard />;
  }
  return <LoginContainer />;
};

export default App;

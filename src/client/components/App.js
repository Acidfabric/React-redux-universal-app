import React from 'react';
// import PropTypes from 'prop-types';

import Dashboard from './Dashboard';
import LoginContainer from '../containers/LoginContainer';

const App = ({ authorization }) => {
  if (authorization.currentUser) {
    return <Dashboard />;
  }
  return <LoginContainer />;
};

// App.propTypes = {
//   authorization: PropTypes.func,
// };

// App.defaultProps = {
//   authorization: null,
// };

export default App;

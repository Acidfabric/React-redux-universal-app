import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import configureStore from './configureStore';
import App from './containers/App';

// Initialize store
const store = configureStore(window.__PRELOADED_STATE__);

const rootElement = document.getElementById('root');
render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  rootElement
);

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('./App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./App').default;
    render(
      <AppContainer>
        <NextApp store={store} />
      </AppContainer>,
      rootElement
    );
  });
}

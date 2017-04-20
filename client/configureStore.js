import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const configureStore = () => {
  // Middleware and store enhancers
  const enhancers = [
    applyMiddleware(thunk),
  ];

  // if (process.env.CLIENT && process.env.NODE_ENV === 'development') {
  //   // Enable DevTools only when rendering on client and during development.
  //   enhancers.push(window.devToolsExtension
  //    ? window.devToolsExtension() : DevTools.instrument());
  // }

  const store = createStore(rootReducer, compose(...enhancers));

  // For hot reloading reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
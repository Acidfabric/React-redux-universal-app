import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const configureStore = (preloadedState) => {
  // Middleware and store enhancers
  const composeEnhancers =
    process.env.NODE_ENV !== 'production'
    && typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        name: 'Acidfabric', actionsBlacklist: ['REDUX_STORAGE_SAVE'],
      })
      : compose;

  const enhancer = composeEnhancers(
    applyMiddleware(thunk),
  );

  const store = createStore(
    rootReducer,
    preloadedState,
    enhancer,
  );

  // For hot reloading reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/rootReducer', () => {
      const nextRootReducer = require('../reducers/rootReducer').default; // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;

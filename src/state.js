import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import rootReducer from './reducer';
import rootSagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-undef
const enhancer = composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware));

const configureStore = (initialState = {}) => {
  const store = createStore(connectRouter(history)(rootReducer), initialState, enhancer);

  sagaMiddleware.run(rootSagas);
  routerMiddleware(history);

  return { store };
};

const { store } = configureStore();

export { store, history };

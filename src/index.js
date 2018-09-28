/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { injectGlobal } from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import Routes from './routes';
import { store, history } from './state';

injectGlobal`
  html, body, button, #root {
    height: 100%;
    margin: 0;
    background-color: transparent;
    border: none;
    outline: none;
    -webkit-font-smoothing: antialiased;
  }
`;

render(
  <AppContainer>
    <Provider store={store}>
        <ConnectedRouter history={history}>{Routes}</ConnectedRouter>
    </Provider>
  </AppContainer>,
  document.getElementById('root'), // eslint-disable-line  no-undef
);

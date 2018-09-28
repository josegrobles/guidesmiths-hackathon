/* eslint-disable arrow-body-style */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AppLayout, GameLayout } from './components/Layout';

const Routes = (
  <div>
    <Switch>
      <Route
        exact
        path="/"
        component={AppLayout}
      />
      <Route
        exact
        path="/game"
        component={GameLayout}
      />
    </Switch>
  </div>
);

export default Routes;

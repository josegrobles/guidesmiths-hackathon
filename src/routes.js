/* eslint-disable arrow-body-style */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { LogInLayout } from './components/Layout';
import { AppLayout } from './components/Layout';

const Routes = (
  <div>
    <Switch>
      <Route
        exact
        path="/"
        component={LogInLayout}
      />
      <Route
        exact
        path="/player-builder"
        component={AppLayout}
      />
    </Switch>
  </div>
);

export default Routes;

/* eslint-disable arrow-body-style */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { AppLayout } from './components/Layout';

const Routes = (
  <div>
    <Switch>
      <Route
        exact
        path="/"
        component={AppLayout}
      />
    </Switch>
  </div>
);

export default Routes;

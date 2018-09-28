/* eslint-disable arrow-body-style */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Routes = (
  <div>
    <Switch>
      <Route
        exact
        path="/"
        component={props => {
          return (
            <MainLayout>
              <LoginScreen {...props} />
            </MainLayout>
          );
        }}
      />
    </Switch>
  </div>
);

export default Routes;

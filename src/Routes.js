import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import {
  Login,
  Register,
  ForgotPassword,
  Dashboard
} from './components/index';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/login" />
      <Route component={Login} exact path="/login" />
      <Route component={Register} exact path="/register" />
      <Route component={ForgotPassword} exact path="/forgot-password" />
      <Route component={Dashboard} exact path="/dashboard" />
    </Switch>
  );
};

export default Routes;

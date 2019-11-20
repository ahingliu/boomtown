import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Items from "../pages/Items"
import Home from "../pages/Home"
import Share from ".../pages/Share"
import Profile from "../pages/Profile"

export default () => (
  <Fragment>
    {/* @TODO: Add your menu component here */}
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/items" component={Items} />
      <Route path="/profile/:userid" component={Profile} />
      <Route path="/profile" component={Profile} />
      <Route path="/share" component={Share} />
    </Switch>
  </Fragment>
);

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import UserBoard from './user/UserBoard';
import Home from './main/Home';
import PrivateRoutes from './backEnd/PrivateRoute';
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} /> */}
        <Route path="/signup" exact component={Signup} />
        <PrivateRoutes path="/user/dashboard" exact component={UserBoard} />
      </Switch>
    </Router>
  );
};

export default Routes;

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './Header';

import Marketing from './Marketing';
import LogIn from './LogIn';
import SignUp from './SignUp';
import DeadEnd from './DeadEnd';

class LandingLayout extends Component {
  render() {
    return (
      <Layout>
        <Header />
        <Layout.Content>
          <Switch>
            <Route exact path="/" component={Marketing} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route component={DeadEnd}/>
          </Switch>
        </Layout.Content>
      </Layout>
    );
  }
}

export default LandingLayout;
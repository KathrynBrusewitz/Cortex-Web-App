import React, { Component } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';

import ListUsers from "./ListUsers";
import CreateUser from "./CreateUser";
import ViewUser from "./ViewUser";
import EditUser from "./EditUser";
import InviteUser from "./InviteUser";
import DeadEnd from "../shared/DeadEnd";
import UsersMenu from "./UsersMenu";

class UsersLayout extends Component {
  render() {
    return (
      <Layout>
        <UsersMenu />
        <Layout.Content style={{ padding: '20px', background: '#fff' }}>
          <Switch>
            {/* Redirects */}
            <Redirect exact from='/users' to='/users/userbase'/>

            {/* Contents Layout Routes */}
            <Route exact path="/users/userbase" component={ListUsers} />
            <Route exact path="/users/userbase/new" component={CreateUser} />
            <Route exact path="/users/userbase/:id" component={ViewUser} />
            <Route exact path="/users/userbase/:id/edit" component={EditUser} />
            <Route exact path="/users/invite" component={InviteUser} />

            {/* No Matching Route */}
            <Route component={DeadEnd} />
          </Switch>
        </Layout.Content>
      </Layout>
    );
  }
}

export default UsersLayout;
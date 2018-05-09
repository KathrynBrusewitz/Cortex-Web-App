import React, { Component } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';

import CreateTerm from '../terms/CreateTerm';
import EditTerm from '../terms/EditTerm';
import ListTerms from '../terms/ListTerms';

import CreateEvent from '../events/CreateEvent';
import ViewEvent from '../events/ViewEvent';
import EditEvent from '../events/EditEvent';
import ListEvents from '../events/ListEvents';

import ViewUser from '../users/ViewUser';
import EditUser from '../users/EditUser';
import ListUsers from '../users/ListUsers';

import Analytics from '../analytics/Analytics';
import DeadEnd from '../shared/DeadEnd';
import Settings from './Settings';
import Header from './Header';
import Breadcrumbs from "./Breadcrumbs";

import ContentsLayout from '../contents/ContentsLayout';
import NonContentsLayout from "./NonContentsLayout";

// Dashboard Layout Routes are put inside it's own Layout because we want to
// pad all pages except the Contents Layout, whose menu should remain full-width.

class DashboardLayout extends Component {
  render() {
    return (
      <Layout>
        <Header />
        <Breadcrumbs />
        <Layout.Content style={{ background: '#fff' }}>
          <Switch>
            {/* Redirects */}
            <Redirect exact from='/' to='/analytics'/>
            <Redirect exact from='/articles' to='/contents/articles'/>
            <Redirect exact from='/podcasts' to='/contents/podcasts'/>
            <Redirect exact from='/videos' to='/contents/videos'/>

            {/* Layouts */}
            <Route path="/contents" component={ContentsLayout} />
            <Route component={NonContentsLayout} />
          </Switch>
        </Layout.Content>
      </Layout>
    );
  }
}

export default DashboardLayout;

import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import CreateArticle from '../articles/CreateArticle';
import ViewArticle from '../articles/ViewArticle';
import EditArticle from '../articles/EditArticle';
import ListArticles from '../articles/ListArticles';

import CreateVideo from '../videos/CreateVideo';
import ViewVideo from '../videos/ViewVideo';
import EditVideo from '../videos/EditVideo';
import ListVideos from '../videos/ListVideos';

import CreatePodcast from '../podcasts/CreatePodcast';
import ViewPodcast from '../podcasts/ViewPodcast';
import EditPodcast from '../podcasts/EditPodcast';
import ListPodcasts from '../podcasts/ListPodcasts';

import CreateTerm from '../terms/CreateTerm';
import EditTerm from '../terms/EditTerm';
import ListTerms from '../terms/ListTerms';

import CreateEvent from '../events/CreateEvent';
import ViewEvent from '../events/ViewEvent';

import ViewUser from '../users/ViewUser';
import EditUser from '../users/EditUser';
import ListUsers from '../users/ListUsers';

import EditEvent from '../events/EditEvent';
import ListEvents from '../events/ListEvents';

import Settings from './Settings';
import Analytics from '../analytics/Analytics';
import DeadEnd from '../shared/DeadEnd';
import Header from './Header';
import Sider from './Sider';

class Dashboard extends Component {
  render() {
    return (
      <Layout>
        <Sider />
        <Layout>
          <Header />
          <Layout.Content className='dashboard-content'>
            <Switch>
              <Route exact path="/" component={Analytics} />
              <Route exact path="/settings" component={Settings} />

              <Route exact path="/articles" component={ListArticles} />
              <Route exact path="/articles/new" component={CreateArticle} />
              <Route exact path="/articles/:id" component={ViewArticle} />
              <Route exact path="/articles/:id/edit" component={EditArticle} />

              <Route exact path="/videos" component={ListVideos} />
              <Route exact path="/videos/new" component={CreateVideo} />
              <Route exact path="/videos/:id" component={ViewVideo} />
              <Route exact path="/videos/:id/edit" component={EditVideo} />

              <Route exact path="/podcasts" component={ListPodcasts} />
              <Route exact path="/podcasts/new" component={CreatePodcast} />
              <Route exact path="/podcasts/:id" component={ViewPodcast} />
              <Route exact path="/podcasts/:id/edit" component={EditPodcast} />

              <Route exact path="/users" component={ListUsers} />
              <Route exact path="/users/:id" component={ViewUser} />
              <Route exact path="/users/:id/edit" component={EditUser} />

              <Route exact path="/terms" component={ListTerms} />
              <Route exact path="/terms/new" component={CreateTerm} />
              <Route exact path="/terms/:id/edit" component={EditTerm} />

              <Route exact path="/events" component={ListEvents} />
              <Route exact path="/events/new" component={CreateEvent} />
              <Route exact path="/events/:id" component={ViewEvent} />
              <Route exact path="/events/:id/edit" component={EditEvent} />
              <Route component={DeadEnd}/>
            </Switch>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard;

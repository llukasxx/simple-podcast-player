import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import EpisodePlayer from './screens/EpisodePlayer';
import EpisodesList from './screens/EpisodesList';
import NoMatch from './screens/NoMatch';

const Routes = () => (
  <Switch>
    <Route exact={true} path="/" render={() => <Redirect to="/episodes" />} />
    <Route exact={true} path="/episodes" component={EpisodesList} />
    <Route path="/episodes/:episodeId" component={EpisodePlayer} />
    <Route component={NoMatch} />
  </Switch>
);

export default Routes;

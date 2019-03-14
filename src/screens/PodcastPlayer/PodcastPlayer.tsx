import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './index.css';
import EpisodePlayer from './screens/EpisodePlayer';
import EpisodesList from './screens/EpisodesList';
import NoMatch from './screens/NoMatch';

const PodcastPlayer = () => (
  <Router>
    <div className="podcast-player">
      <Switch>
        <Route
          exact={true}
          path="/"
          render={() => <Redirect to="/episodes" />}
        />
        <Route exact={true} path="/episodes" component={EpisodesList} />
        <Route path="/episodes/:episodeId" component={EpisodePlayer} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default PodcastPlayer;

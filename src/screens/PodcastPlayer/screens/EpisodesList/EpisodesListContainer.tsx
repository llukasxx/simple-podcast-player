import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import api from '../../shared/api';
import {
  actions as EPISODES_ACTIONS,
  IEpisode,
} from '../../shared/ducks/episodes';
import { IStore } from '../../shared/store';
import EpisodesList from './EpisodesList';

interface IProps {
  episodes: IEpisode[];
  dispatch: Dispatch<EPISODES_ACTIONS.ActionReturnTypes>;
}

const EpisodesListContainer = ({ dispatch, episodes }: IProps) => {
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const res = await api.get('episodes');
        const json = await res.json();
        dispatch(EPISODES_ACTIONS.setEpisodes(json));
      } catch {
        setError(true);
      }
      setLoaded(true);
    };

    fetchEpisodes();

    return () => {
      dispatch(EPISODES_ACTIONS.clearEpisodes());
    };
  }, []);

  if (!loaded) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Unexpected error</span>;
  }

  return <EpisodesList episodes={episodes} />;
};

const mapStateToProps = (state: IStore) => {
  const { episodes } = state;
  return {
    episodes,
  };
};

export default connect(mapStateToProps)(EpisodesListContainer);

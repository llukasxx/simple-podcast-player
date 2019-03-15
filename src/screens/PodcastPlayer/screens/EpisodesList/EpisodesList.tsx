import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Dispatch } from 'redux';
import {
  actions as EPISODES_ACTIONS,
  IEpisode,
} from '../../shared/ducks/episodes';
import { IStore } from '../../shared/store';
import useFetchEpisodesList from './hooks/useFetchEpisodesList';

interface IProps {
  episodes: IEpisode[];
  dispatch: Dispatch<EPISODES_ACTIONS.ActionReturnTypes>;
}

const renderEpisodes = (episodes: IEpisode[]) => {
  return episodes.map(({ id, name }) => (
    <div key={id}>
      <NavLink to={`/episodes/${id}`}>{name}</NavLink>
    </div>
  ));
};

const EpisodesList = ({ dispatch, episodes }: IProps) => {
  const { loaded, error } = useFetchEpisodesList(dispatch);

  if (!loaded) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Unexpected error</span>;
  }

  return episodes.length > 0 ? (
    <div>
      <div>List of all episodes:</div>
      {renderEpisodes(episodes)}
    </div>
  ) : (
    <div>Episode list is empty</div>
  );
};

const mapStateToProps = (state: IStore) => {
  const { episodes } = state;
  return {
    episodes,
  };
};

export default connect(mapStateToProps)(EpisodesList);

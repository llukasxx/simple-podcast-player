import React from 'react';
import { NavLink } from 'react-router-dom';
import { IEpisode } from '../../shared/ducks/episodes';

interface IProps {
  episodes: IEpisode[];
}

const renderEpisodes = (episodes: IEpisode[]) => {
  return episodes.map(({ id, name }) => (
    <div key={id}>
      <NavLink to={`/episodes/${id}`}>{name}</NavLink>
    </div>
  ));
};

const EpisodesList = ({ episodes }: IProps) => {
  return (
    <div>
      {episodes.length > 0 ? (
        <>
          <div>List of all episodes:</div>
          {renderEpisodes(episodes)}
        </>
      ) : (
        <div>Episode list is empty</div>
      )}
    </div>
  );
};

export default EpisodesList;

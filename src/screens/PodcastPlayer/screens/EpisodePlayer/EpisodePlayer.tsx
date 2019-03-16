import React from 'react';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import useFetchEpisode from './shared/hooks/useFetchEpisode';

interface IProps extends RouteComponentProps {
  match: RouteComponentProps<{ episodeId: string }>['match'];
}

const EpisodePlayer = ({
  match: {
    params: { episodeId },
  },
}: IProps) => {
  const { loaded, error, episode } = useFetchEpisode(episodeId);
  if (!loaded) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Unexpected error</div>;
  }
  if (!episode) {
    return <div>Episode not found</div>;
  }
  return (
    <div className="episode-player">
      <NavLink to="/episodes"> {'<<'} Go back to list</NavLink>
      <div>{episode.name}</div>
      <div>{JSON.stringify(episode)}</div>
    </div>
  );
};

export default EpisodePlayer;

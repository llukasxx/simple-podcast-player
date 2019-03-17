import React from 'react';
import { match, NavLink, RouteComponentProps } from 'react-router-dom';
import AudioPlayer from './components/AudioPlayer';
import useFetchEpisode from './shared/hooks/useFetchEpisode';

interface IProps extends RouteComponentProps {
  match: match<{ episodeId: string }>;
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
      <AudioPlayer audioUrl={episode.audio} />
    </div>
  );
};

export default EpisodePlayer;

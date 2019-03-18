import React from 'react';
import { match, NavLink, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { IMarker } from '../../shared/ducks/episodes';
import AudioPlayer from './components/AudioPlayer';
import MarkerPlayer from './components/MarkerPlayer';
import useFetchEpisode from './shared/hooks/useFetchEpisode';

interface IProps extends RouteComponentProps {
  match: match<{ episodeId: string }>;
}

const PlayerWrapper = styled.div`
  position: relative;
`;

const EpisodePlayer = ({
  match: {
    params: { episodeId },
  },
}: IProps) => {
  const { loaded, error, episode } = useFetchEpisode(episodeId);
  const [time, setTime] = React.useState(0);
  const [adPlaying, setAdPlaying] = React.useState(false);
  const [skippedAds, setSkippedAds] = React.useState<IMarker[] | null>(null);
  const [resume, setResume] = React.useState(false);

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
    <PlayerWrapper>
      <NavLink to="/episodes"> {'<<'} Go back to list</NavLink>
      <div>{episode.name}</div>
      <AudioPlayer
        audioUrl={episode.audio}
        setTime={setTime}
        time={time}
        adPlaying={adPlaying}
        skippedAds={skippedAds}
        setSkippedAds={setSkippedAds}
        resume={resume}
        setResume={setResume}
        markers={episode.markers}
      />
      <MarkerPlayer
        markers={episode.markers}
        currentTime={time}
        setAdPlaying={setAdPlaying}
        skippedAds={skippedAds}
        setSkippedAds={setSkippedAds}
        setResume={setResume}
      />
    </PlayerWrapper>
  );
};

export default EpisodePlayer;

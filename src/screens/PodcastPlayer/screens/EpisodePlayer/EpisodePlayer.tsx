import React from 'react';
import { match, NavLink, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { IMarker } from '../../shared/ducks/episodes';
import AudioPlayer from './components/AudioPlayer';
import MarkerPlayer from './components/MarkerPlayer';
import useFetchEpisode from './shared/hooks/useFetchEpisode';
import useSkippedAds from './shared/hooks/useSkippedAds';

interface IProps extends RouteComponentProps {
  match: match<{ episodeId: string }>;
}

const PlayerWrapper = styled.div`
  position: relative;
`;

const getCurrentMarker = (markers: IMarker[], currentTime: number) => {
  const currentMarkerIndex = markers.findIndex((marker) => {
    return (
      currentTime > marker.start && currentTime < marker.start + marker.duration
    );
  });
  if (currentMarkerIndex > -1) {
    return markers[currentMarkerIndex];
  }
  return null;
};

const EpisodePlayer = ({
  match: {
    params: { episodeId },
  },
}: IProps) => {
  const { loaded, error, episode } = useFetchEpisode(episodeId);
  const [time, setTime] = React.useState(0);
  const { currentSkippedAd, dispatch: skippedAdsDispatch } = useSkippedAds(
    episode,
  );

  if (!loaded) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Unexpected error</div>;
  }
  if (!episode) {
    return <div>Episode not found</div>;
  }

  const marker = currentSkippedAd || getCurrentMarker(episode.markers, time);
  const adPlaying = !!currentSkippedAd || (!!marker && marker.type === 'ad');
  return (
    <PlayerWrapper>
      <NavLink to="/episodes"> {'<<'} Go back to list</NavLink>
      <div>{episode.name}</div>
      <AudioPlayer
        audioUrl={episode.audio}
        setTime={setTime}
        time={time}
        onTimeSkip={(currentTime: number, skippedTo: number) => {
          skippedAdsDispatch({
            payload: {
              currentTime,
              skippedTo,
            },
            type: 'TIME_SKIP',
          });
        }}
        adPlaying={adPlaying}
        playDisabled={!!currentSkippedAd}
      />
      {marker && <MarkerPlayer marker={marker} />}
    </PlayerWrapper>
  );
};

export default EpisodePlayer;

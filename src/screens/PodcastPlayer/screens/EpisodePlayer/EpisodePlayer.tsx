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

const skippedAdsReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_ADS':
      return { ...state, ads: action.payload };
    case 'TIME_SKIP':
      const { currentTime, skippedTo } = action.payload;
      const skippedAds = state.ads.filter(
        (ad: any) => ad.start >= currentTime && ad.start <= skippedTo,
      );
      return { ...state, skippedAds };
    case 'SET_CURRENT_AD':
      return { ...state, currentSkippedAd: action.payload };
    case 'REMOVE_CURRENT_AD':
      return { ...state, skippedAds: state.skippedAds.slice(1) };
    default:
      return state;
  }
};

const EpisodePlayer = ({
  match: {
    params: { episodeId },
  },
}: IProps) => {
  const { loaded, error, episode } = useFetchEpisode(episodeId);
  const [time, setTime] = React.useState(0);

  const [skippedAdsState, skippedAdsDispatch] = React.useReducer(
    skippedAdsReducer,
    {
      ads: null,
      currentSkippedAd: null,
      skippedAds: [],
    },
  );

  const { currentSkippedAd, skippedAds } = skippedAdsState;

  React.useEffect(() => {
    if (episode) {
      skippedAdsDispatch({
        payload: episode.markers.filter((eMarker) => eMarker.type === 'ad'),
        type: 'SET_ADS',
      });
    }
  }, [episode]);

  React.useEffect(() => {
    const skippedAdsPresent = skippedAds.length > 0;
    skippedAdsDispatch({
      payload: skippedAdsPresent ? skippedAds[0] : null,
      type: 'SET_CURRENT_AD',
    });
  }, [skippedAds]);

  React.useEffect(() => {
    if (currentSkippedAd) {
      const id = setTimeout(() => {
        skippedAdsDispatch({ type: 'REMOVE_CURRENT_AD' });
      }, currentSkippedAd.duration * 1000);
      return () => {
        clearTimeout(id);
      };
    }
  }, [currentSkippedAd]);

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

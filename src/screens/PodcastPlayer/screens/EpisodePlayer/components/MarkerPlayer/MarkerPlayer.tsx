import React from 'react';
import styled from 'styled-components';
import { IMarker } from '../../../../shared/ducks/episodes';
import SkippedAdsHandler from './SkippedAdsHandler';
import Types from './Types';

interface IProps {
  markers: IMarker[];
  skippedAds: IMarker[] | null;
  setSkippedAds: (val: null) => void;
  currentTime: number;
  setAdPlaying: (val: boolean) => void;
  setResume: (val: boolean) => void;
}

const renderMarker = (currentMarker: IMarker | null) => {
  if (!currentMarker) {
    return null;
  }
  switch (currentMarker.type) {
    case 'ad':
      return (
        <Types.Ad content={currentMarker.content} link={currentMarker.link} />
      );
    case 'image':
      return <Types.Image content={currentMarker.content} />;
    case 'text':
      return <Types.Text content={currentMarker.content} />;
    default:
      return <div>Unrecognized Marker</div>;
  }
};

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

const MarkerWrapper = styled.div`
  position: absolute;
`;

const MarkerPlayer = ({
  markers,
  currentTime,
  setAdPlaying,
  skippedAds,
  setSkippedAds,
  setResume,
}: IProps) => {
  if (skippedAds) {
    setAdPlaying(true);
    return (
      <MarkerWrapper>
        <SkippedAdsHandler
          skippedAds={skippedAds}
          setAdPlaying={setAdPlaying}
          setSkippedAds={setSkippedAds}
          setResume={setResume}
        />
      </MarkerWrapper>
    );
  }

  const currentMarker = getCurrentMarker(markers, currentTime);
  if (currentMarker && currentMarker.type === 'ad') {
    setAdPlaying(true);
  } else {
    setAdPlaying(false);
  }
  return <MarkerWrapper>{renderMarker(currentMarker)}</MarkerWrapper>;
};

export default MarkerPlayer;

import React from 'react';
import styled from 'styled-components';
import { IMarker } from '../../../../shared/ducks/episodes';
import Types from './Types';

interface IProps {
  markers: IMarker[];
  currentTime: number;
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

const MarkerPlayer = ({ markers, currentTime }: IProps) => {
  const currentMarker = getCurrentMarker(markers, currentTime);

  return <MarkerWrapper>{renderMarker(currentMarker)}</MarkerWrapper>;
};

export default MarkerPlayer;

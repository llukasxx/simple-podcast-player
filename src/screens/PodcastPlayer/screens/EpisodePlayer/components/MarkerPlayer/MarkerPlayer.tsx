import React from 'react';
import styled from 'styled-components';
import { IMarker } from '../../../../shared/ducks/episodes';
import Types from './Types';

interface IProps {
  marker: IMarker;
}

const renderMarker = (marker: IMarker | null) => {
  if (!marker) {
    return null;
  }
  switch (marker.type) {
    case 'ad':
      return <Types.Ad content={marker.content} link={marker.link} />;
    case 'image':
      return <Types.Image content={marker.content} />;
    case 'text':
      return <Types.Text content={marker.content} />;
    default:
      return <div>Unrecognized Marker</div>;
  }
};

const MarkerWrapper = styled.div`
  position: absolute;
`;

const MarkerPlayer = ({ marker }: IProps) => {
  return <MarkerWrapper>{renderMarker(marker)}</MarkerWrapper>;
};

export default MarkerPlayer;

import React from 'react';
import styled from 'styled-components';
import { IMarker } from '../../../../shared/ducks/episodes';
import Types from './Types';

interface IProps {
  marker: IMarker;
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

const MarkerWrapper = styled.div`
  position: absolute;
`;

const MarkerPlayer = ({ marker }: IProps) => {
  return <MarkerWrapper>{renderMarker(marker)}</MarkerWrapper>;
};

export default MarkerPlayer;

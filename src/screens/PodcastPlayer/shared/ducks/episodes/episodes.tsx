import { ActionReturnTypes } from './actions';
import * as TYPES from './types';

enum MarkerType {
  ad = 'ad',
  image = 'image',
  text = 'text',
}

interface IMarker {
  type: MarkerType;
  start: number;
  duration: number;
  content: string;
}

export interface IEpisode {
  id: string;
  audio: string;
  name: string;
  markers: IMarker[];
}

const episodesReducer = (state: IEpisode[] = [], action: ActionReturnTypes) => {
  switch (action.type) {
    case TYPES.SET:
      return action.payload;
    case TYPES.CLEAR:
      return action.payload;
    default:
      return state;
  }
};

export default episodesReducer;

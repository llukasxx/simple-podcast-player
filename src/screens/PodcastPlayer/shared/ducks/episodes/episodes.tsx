import { ActionReturnTypes } from './actions';
import * as TYPES from './types';

enum Marker {
  ad = 'ad',
  image = 'image',
  text = 'text',
}

interface IMarker {
  type: Marker;
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

export type ReducerState = IEpisode[];

const episodesReducer = (
  state: ReducerState = [],
  action: ActionReturnTypes,
) => {
  switch (action.type) {
    case TYPES.SET:
      return action.payload;
    case TYPES.CLEAR:
      return [];
    default:
      return state;
  }
};

export default episodesReducer;

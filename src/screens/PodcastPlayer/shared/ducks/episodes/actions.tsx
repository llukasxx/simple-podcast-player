import { IEpisode } from './episodes';
import * as TYPES from './types';

export const setEpisodes = (episodes: IEpisode[]) => {
  return {
    payload: episodes,
    type: TYPES.SET,
  };
};

export const clearEpisodes = () => {
  return {
    payload: [],
    type: TYPES.CLEAR,
  };
};

export type ActionReturnTypes = ReturnType<
  typeof setEpisodes | typeof clearEpisodes
>;

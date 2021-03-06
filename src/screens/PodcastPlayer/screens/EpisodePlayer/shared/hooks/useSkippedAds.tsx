import React from 'react';
import { IEpisode, IMarker } from '../../../../shared/ducks/episodes';

interface IState {
  ads: IMarker[] | null;
  currentSkippedAd: IMarker | null;
  skippedAds: IMarker[];
}

interface IAction {
  payload?: any;
  type: string;
}

const skippedAdsReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'SET_ADS':
      return { ...state, ads: action.payload };
    case 'TIME_SKIP':
      const { currentTime, skippedTo } = action.payload;
      if (!state.ads) {
        return state;
      }
      const skippedAds = state.ads.filter(
        (ad) => ad.start >= currentTime && ad.start <= skippedTo,
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

const useSkippedAds = (episode: IEpisode | null) => {
  const [state, dispatch] = React.useReducer(skippedAdsReducer, {
    ads: null,
    currentSkippedAd: null,
    skippedAds: [],
  });

  const { currentSkippedAd, skippedAds } = state;

  React.useEffect(() => {
    if (episode) {
      dispatch({
        payload: episode.markers.filter((eMarker) => eMarker.type === 'ad'),
        type: 'SET_ADS',
      });
    }
  }, [episode]);

  React.useEffect(() => {
    const skippedAdsPresent = skippedAds.length > 0;
    dispatch({
      payload: skippedAdsPresent ? skippedAds[0] : null,
      type: 'SET_CURRENT_AD',
    });
  }, [skippedAds]);

  React.useEffect(() => {
    if (currentSkippedAd) {
      const id = setTimeout(() => {
        dispatch({ type: 'REMOVE_CURRENT_AD' });
      }, currentSkippedAd.duration * 1000);
      return () => {
        clearTimeout(id);
      };
    }
  }, [currentSkippedAd]);

  return {
    currentSkippedAd,
    dispatch,
  };
};

export default useSkippedAds;

import React from 'react';

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

const useSkippedAds = (episode: any) => {
  const [state, dispatch] = React.useReducer(skippedAdsReducer, {
    ads: null,
    currentSkippedAd: null,
    skippedAds: [],
  });

  const { currentSkippedAd, skippedAds } = state;

  React.useEffect(() => {
    if (episode) {
      dispatch({
        payload: episode.markers.filter(
          (eMarker: any) => eMarker.type === 'ad',
        ),
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

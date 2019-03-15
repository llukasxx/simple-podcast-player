import React from 'react';
import { Dispatch } from 'redux';
import api from '../../../shared/api';
import { actions as EPISODES_ACTIONS } from '../../../shared/ducks/episodes';

const useFetchEpisodesList = (
  dispatch: Dispatch<EPISODES_ACTIONS.ActionReturnTypes>,
) => {
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const res = await api.get('episodes');
        const json = await res.json();
        dispatch(EPISODES_ACTIONS.setEpisodes(json));
      } catch (err) {
        setError(true);
      }
      setLoaded(true);
    };

    fetchEpisodes();

    return () => {
      dispatch(EPISODES_ACTIONS.clearEpisodes());
    };
  }, []);

  return {
    error,
    loaded,
  };
};

export default useFetchEpisodesList;

import React from 'react';
import api from '../../../../shared/api';
import { IEpisode } from '../../../../shared/ducks/episodes';

interface IReturn {
  error: boolean;
  loaded: boolean;
  episode: IEpisode | null;
}

const useFetchEpisode = (id: string): IReturn => {
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [episode, setEpisode] = React.useState(null);

  React.useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const res = await api.get(`episodes/${id}`);
        const json = await res.json();
        setEpisode(json);
      } catch {
        setError(true);
      }
      setLoaded(true);
    };
    fetchEpisode();
  }, []);

  return {
    episode,
    error,
    loaded,
  };
};

export default useFetchEpisode;

import React, { ChangeEvent } from 'react';
import { IEpisode } from '../../../../shared/ducks/episodes';

interface IProps {
  audioUrl: IEpisode['audio'];
  setTime: (val: number) => void;
  time: number;
}

const AudioPlayer = ({ audioUrl, setTime, time }: IProps) => {
  const fullUrl = `${process.env.REACT_APP_HOST}${audioUrl}`;
  const audio = React.useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = React.useState(false);

  React.useEffect(() => {
    const { current } = audio;
    if (current) {
      current.ontimeupdate = () => {
        setTime(current.currentTime);
      };
      current.onended = () => {
        setPlaying(false);
      };
    }
    return () => {
      if (current) {
        current.ontimeupdate = null;
        current.onended = null;
      }
    };
  }, []);

  const getProgressPerc = () => {
    const { current } = audio;
    if (current) {
      return Math.round((100 * time) / current.duration);
    }
    return 0;
  };

  const togglePlay = () => {
    const { current } = audio;
    if (current) {
      if (playing) {
        current.pause();
        setPlaying(false);
      } else {
        current.play();
        setPlaying(true);
      }
    }
  };

  const skipTime = (val: number) => {
    const { current } = audio;
    if (current) {
      current.currentTime = current.currentTime + val;
    }
  };

  const onSeek = (event: ChangeEvent<HTMLInputElement>) => {
    const { current } = audio;
    if (current) {
      const targetTime = Math.round(
        (parseInt(event.target.value, 10) * Math.round(current.duration)) / 100,
      );

      current.currentTime = targetTime;
    }
  };

  return (
    <div>
      <audio ref={audio} src={fullUrl} />
      <button onClick={() => skipTime(-5)}>{'<<'}</button>
      <button onClick={() => togglePlay()}>{playing ? 'pause' : 'play'}</button>
      <button onClick={() => skipTime(5)}>{'>>'}</button>
      <br />
      <input
        type="range"
        min="0"
        max="100"
        value={getProgressPerc()}
        onChange={onSeek}
      />
    </div>
  );
};

export default AudioPlayer;

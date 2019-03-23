import React, { ChangeEvent } from 'react';
import { IEpisode, IMarker } from '../../../../shared/ducks/episodes';

interface IProps {
  audioUrl: IEpisode['audio'];
  setTime: (val: number) => void;
  time: number;
  adPlaying: boolean;
  onTimeSkip: (currentTime: number, skippedTo: number) => void;
  playDisabled: boolean;
}

const AudioPlayer = ({
  audioUrl,
  setTime,
  time,
  adPlaying,
  onTimeSkip,
  playDisabled,
}: IProps) => {
  const fullUrl = `${process.env.REACT_APP_HOST}${audioUrl}`;
  const audio = React.useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = React.useState(false);
  const [resume, setResume] = React.useState(false);

  React.useEffect(() => {
    const { current } = audio;
    if (current) {
      current.ontimeupdate = () => {
        setTime(current.currentTime);
      };
      current.onended = () => {
        setPlaying(false);
      };
      return () => {
        current.ontimeupdate = null;
        current.onended = null;
      };
    }
  }, []);

  React.useEffect(() => {
    const { current } = audio;
    if (current) {
      current.onseeking = () => {
        onTimeSkip(time, current.currentTime);
      };
      return () => {
        current.onseeking = null;
      };
    }
  }, [time]);

  // resume playing when skipped ads are flushed
  React.useEffect(() => {
    const { current } = audio;
    if (current) {
      if (playDisabled) {
        playing ? setResume(true) : setResume(false);
        current.pause();
        setPlaying(false);
      } else if (resume) {
        current.play();
        setPlaying(true);
      }
    }
  }, [playDisabled]);

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
      <button disabled={adPlaying} onClick={() => skipTime(-5)}>
        {'<<'}
      </button>
      <button disabled={playDisabled} onClick={() => togglePlay()}>
        {playing ? 'pause' : 'play'}
      </button>
      <button disabled={adPlaying} onClick={() => skipTime(5)}>
        {'>>'}
      </button>
      <br />
      <input
        type="range"
        min="0"
        max="100"
        value={getProgressPerc()}
        disabled={adPlaying}
        onChange={onSeek}
      />
    </div>
  );
};

export default AudioPlayer;

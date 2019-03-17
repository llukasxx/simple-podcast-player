import React from 'react';
import Types from '../Types';

interface IProps {
  skippedAds: any;
  setAdPlaying: (val: boolean) => void;
  setSkippedAds: (val: null) => void;
  setResume: (val: boolean) => void;
}

const SkippedAdsHandler = ({
  skippedAds,
  setAdPlaying,
  setSkippedAds,
  setResume,
}: IProps) => {
  const [currentAdIndex, setCurrentAdIndex] = React.useState(0);
  const currentAd = skippedAds[currentAdIndex];

  React.useEffect(() => {
    if (!currentAd) {
      setResume(true);
      setAdPlaying(false);
      setSkippedAds(null);
      return;
    }
    const id = setTimeout(() => {
      setCurrentAdIndex(currentAdIndex + 1);
    }, currentAd.duration * 1000);

    return () => {
      clearTimeout(id);
    };
  }, [currentAdIndex]);

  if (!currentAd) {
    return null;
  }

  return (
    <div>
      <Types.Ad link={currentAd.link} content={currentAd.content} />
    </div>
  );
};

export default SkippedAdsHandler;

import React from 'react';
import { NavLink } from 'react-router-dom';

const EpisodesPlayer = () => {
  return (
    <div className="episode-player">
      <NavLink to="/episodes"> {'<<'} Go back to list</NavLink>
      <div>Single Episode</div>
    </div>
  );
};

export default EpisodesPlayer;

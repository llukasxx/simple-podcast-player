import React from 'react';
import { NavLink } from 'react-router-dom';

const EpisodesList = () => {
  return (
    <div>
      <div>List of all episodes:</div>
      <div>
        <NavLink to="/episodes/ep1">ep1</NavLink>
      </div>
      <div>
        <NavLink to="/episodes/ep2">ep2</NavLink>
      </div>
      <div>
        <NavLink to="/episodes/ep3">ep3</NavLink>
      </div>
    </div>
  );
};

export default EpisodesList;

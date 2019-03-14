import React from 'react';
import { NavLink } from 'react-router-dom';

const NoMatch = () => (
  <div>
    Route not found, click <NavLink to="/">here</NavLink> to return to main page
  </div>
);

export default NoMatch;

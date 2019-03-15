import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components/macro';
import Routes from './Routes';
import providers from './shared/providers';

const PodcastPlayerWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10vh;
`;

const { Providers } = providers();

const PodcastPlayer = () => (
  <Providers>
    <Router>
      <PodcastPlayerWrapper>
        <Routes />
      </PodcastPlayerWrapper>
    </Router>
  </Providers>
);

export default PodcastPlayer;

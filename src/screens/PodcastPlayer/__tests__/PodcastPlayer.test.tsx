import React from 'react';
import { render } from 'react-testing-library';
import PodcastPlayer from '../PodcastPlayer';

test('It renders without a crash', () => {
  render(<PodcastPlayer />);
});

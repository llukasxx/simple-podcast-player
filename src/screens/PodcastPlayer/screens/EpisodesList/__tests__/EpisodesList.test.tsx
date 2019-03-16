import React from 'react';
import { wait } from 'react-testing-library';
import api from '../../../shared/api';
import { render } from '../../../shared/testUtils';
import EpisodesList from '../EpisodesList';

jest.mock('../../../shared/api', () => ({
  get: jest.fn(),
}));

test('List items are displayed properly', async () => {
  // @ts-ignore
  api.get.mockImplementation(() => ({
    json: () =>
      Promise.resolve([
        {
          audio: '/audio/ep1.mp3',
          id: 'ep1',
          markers: [],
          name: 'Episode1',
        },
        {
          audio: '/audio/ep2.mp3',
          id: 'ep2',
          markers: [],
          name: 'Episode2',
        },
      ]),
  }));
  const { getByText } = render(<EpisodesList />);
  await wait();
  expect(getByText('Episode1')).toBeInTheDocument();
  expect(getByText('Episode2')).toBeInTheDocument();
});

test('List shows error properly', async () => {
  // @ts-ignore
  api.get.mockImplementation(() => ({
    json: () => Promise.reject(),
  }));
  const { getByText } = render(<EpisodesList />);
  await wait();
  expect(getByText(/error/)).toBeInTheDocument();
});

test('List shows proper info when is empty', async () => {
  // @ts-ignore
  api.get.mockImplementation(() => ({
    json: () => Promise.resolve([]),
  }));
  const { getByText } = render(<EpisodesList />);
  await wait();
  expect(getByText(/Episodes list is empty/)).toBeInTheDocument();
});

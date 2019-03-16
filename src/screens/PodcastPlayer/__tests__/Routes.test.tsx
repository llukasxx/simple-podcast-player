import React from 'react';
import { fireEvent, wait } from 'react-testing-library';
import Routes from '../Routes';
import api from '../shared/api';
import { render } from '../shared/testUtils';

jest.mock('../shared/api', () => ({
  get: jest.fn(),
}));

test('Routes redirects from / to /episodes', () => {
  const { history } = render(<Routes />, { route: '/' });
  expect(history.location.pathname).toBe('/episodes');
});

test('Routes renders NoMatch when non-matching path is provided', () => {
  const { getByText } = render(<Routes />, {
    route: '/definetly-not-valid-path',
  });
  expect(getByText(/Route not found/)).toBeInTheDocument();
});

test('I can navigate between list and episode', async () => {
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
      ]),
  }));
  const { history, getByText } = render(<Routes />, { route: '/' });
  await wait();
  const ep1Link = getByText(/Episode1/);
  fireEvent.click(ep1Link);
  expect(history.location.pathname).toBe('/episodes/ep1');
  await wait();
  const backLink = getByText(/Go back to list/);
  fireEvent.click(backLink);
  expect(history.location.pathname).toBe('/episodes');
});

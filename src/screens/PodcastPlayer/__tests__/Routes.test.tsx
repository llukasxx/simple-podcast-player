import React from 'react';
import Routes from '../Routes';
import { render } from '../shared/testUtils';

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

test.skip('I can navigate between Episodes list and episode', () => {
  // TODO
});

import { createMemoryHistory } from 'history';
import React, { ReactNode } from 'react';
import { Router } from 'react-router-dom';
import { render as rtlRender } from 'react-testing-library';
import providers from '../providers';

export const render = (
  node: ReactNode,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    initialState = {},
    ...options
  } = {},
) => {
  const { Providers, store } = providers(initialState);
  return {
    ...rtlRender(
      <Providers>
        <Router history={history}>{node}</Router>
      </Providers>,
      options,
    ),
    history,
    store,
  };
};

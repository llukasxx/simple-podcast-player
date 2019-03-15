import React, { ReactNode } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import makeStore, { IStore } from './shared/store';

// Providers are extracted just so they can be easily used in tests as well
const Providers = (initialState?: IStore) => {
  const store = makeStore(initialState);
  return {
    Provider: ({ children }: { children: ReactNode }) => (
      <StoreProvider store={store}>{children}</StoreProvider>
    ),
    store,
  };
};

export default Providers;

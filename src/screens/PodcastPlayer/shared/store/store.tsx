import { combineReducers, createStore } from 'redux';
import episodes from '../ducks/episodes';

const makeStore = (initialState) => {
  const store = createStore(combineReducers({ episodes }), initialState);
  return store;
};

export default makeStore;

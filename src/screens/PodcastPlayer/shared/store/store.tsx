import { combineReducers, createStore } from 'redux';
import episodes, {
  ReducerState as EpisodesReducerState,
} from '../ducks/episodes';

export interface IStore {
  episodes?: EpisodesReducerState;
}

const makeStore = (initialState?: IStore) => {
  const store = createStore(combineReducers({ episodes }), initialState);
  return store;
};

export default makeStore;

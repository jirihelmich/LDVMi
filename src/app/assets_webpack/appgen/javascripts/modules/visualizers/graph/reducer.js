import { combineReducers } from 'redux';
import graph from './ducks/graph'
import dirty from './ducks/dirty'

const rootReducer = combineReducers({
  graph,
  dirty
});

export default rootReducer;

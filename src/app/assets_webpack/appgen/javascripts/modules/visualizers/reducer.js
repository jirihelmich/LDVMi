import { combineReducers } from 'redux';
import googleMaps from './googleMaps/reducer'
import chord from './chord/reducer'
import graph from './graph/reducer'

const rootReducer = combineReducers({
  googleMaps,
  chord,
  graph
});
export default rootReducer;
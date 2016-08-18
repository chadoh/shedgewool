import { combineReducers } from 'redux';
import schedule from './schedule';
import favorites from './favorites';

export default combineReducers({
  schedule2: schedule,
  favorites,
});

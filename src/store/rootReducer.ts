import { combineReducers } from 'redux';
import searchReducer from './searchSlice';

const rootReducer = combineReducers({
  search: searchReducer,
});

export default rootReducer;
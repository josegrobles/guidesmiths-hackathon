import { combineReducers } from 'redux';

// reducers
import { user } from './user';

const rootReducer = combineReducers({
  user
});

export default rootReducer;

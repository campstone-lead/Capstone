import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import artist from './artist';
import booker from './booker';
import venue from './venue';
import filter from './filter';
import event from './event';
import message from './message';

const reducer = combineReducers({
  user,
  booker,
  artist,
  venue,
  filter,
  event,
  message
});
//createLogger({ collapsed: true }) -> add this to see the logge in the console!
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware)
);
const store = createStore(reducer, middleware);

export default store;

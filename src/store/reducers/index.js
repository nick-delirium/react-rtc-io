import { combineReducers } from 'redux';

import messages from './messages.js';
import users from './users.js';
import currentUser from './currentUser';
import path from './path';

export default combineReducers({
  messages,
  users,
  currentUser,
  path,
});

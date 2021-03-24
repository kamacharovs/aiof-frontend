import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './reducers/auth';
import common from './reducers/common';
import fi from './reducers/fi';
import finance from './reducers/finance';
import home from './reducers/home';
import profile from './reducers/profile';
import property from './reducers/property';
import retirement from './reducers/retirement';
import utility from './reducers/utility';

export default combineReducers({
  auth,
  common,
  fi,
  finance,
  home,
  profile,
  property,
  retirement,
  utility,
  router: routerReducer
});

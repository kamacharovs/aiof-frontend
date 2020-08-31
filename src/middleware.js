import agent from './agent';
import Cookies from 'js-cookie';
import {
  ASYNC_START,
  ASYNC_END,
  LOGIN,
  LOGOUT,
  REGISTER
} from './constants/actionTypes';
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  USER,
} from './constants/common';

const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: ASYNC_START, subtype: action.type });

    const currentView = store.getState().viewChangeCounter;
    const skipTracking = action.skipTracking;

    action.payload.then(
      res => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        console.log('RESULT', res);
        action.payload = res;
        store.dispatch({ type: ASYNC_END, promise: action.payload });
        store.dispatch(action);
      },
      error => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        console.log('ERROR', error);  //TODO : add logic if the error is unauthorized and the refresh_token is not null then call agent.Auth.refresh
        action.error = true;
        action.payload = error.response.body;
        if (!action.skipTracking) {
          store.dispatch({ type: ASYNC_END, promise: action.payload });
        }
        store.dispatch(action);
      }
    );

    return;
  }

  next(action);
};

const localStorageMiddleware = store => next => action => {
  if (action.type === REGISTER || action.type === LOGIN) {
    if (!action.error) {
      const expires = new Date(new Date().getTime() + action.payload.expires * 1000);

      Cookies.set(ACCESS_TOKEN, action.payload.access_token, { path: '/', expires: expires });
      Cookies.set(REFRESH_TOKEN, action.payload.refresh_token, { path: '/' });
      Cookies.set(USER, action.payload.user, { path: '/' });

      agent.setToken(action.payload.acess_token);
    }
  } else if (action.type === LOGOUT) {
    Cookies.remove(ACCESS_TOKEN);
    Cookies.remove(REFRESH_TOKEN);
    Cookies.remove(USER);

    agent.setToken(null);
    agent.setRefreshToken(null);
  }

  next(action);
};

function isPromise(v) {
  return v && typeof v.then === 'function';
}


export { promiseMiddleware, localStorageMiddleware }

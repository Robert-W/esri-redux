// @flow
import {createStore, applyMiddleware} from 'redux';
import {ENV_PROD} from 'js/constants/appConstants';
import {asyncActions, logger} from 'js/utils/middleware';
import appReducer from 'js/reducers/appReducer';

const middleware:Array<Middleware> = [asyncActions];

// Remove the logger for production
if (process.env.NODE_ENV !== ENV_PROD) {
  middleware.push(logger);
}

export default createStore(
  appReducer,
  applyMiddleware(...middleware)
);

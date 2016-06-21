import {createStore, applyMiddleware} from 'redux';
import {ENV_PROD} from 'js/constants/appConstants';
import {async, logger} from 'js/utils/middleware';
import appReducer from 'js/reducers/appReducer';

const middleware = [async];

// Remove the logger for production
if (process.env.NODE_ENV !== ENV_PROD) {
  middleware.push(logger);
}

export default createStore(
  appReducer,
  applyMiddleware(...middleware)
);

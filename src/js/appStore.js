import {createStore, applyMiddleware} from 'redux';
import {async, logger} from 'js/utils/middleware';
import appReducer from 'js/reducers/appReducer';

const middleware = [async];

// Remove the logger for production
middleware.push(logger);

export default createStore(
  appReducer,
  applyMiddleware(...middleware)
);

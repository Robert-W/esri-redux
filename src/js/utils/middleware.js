/* @flow */
const styles = {
  actionType: 'font-weight:bold;font-size:1.1em',
  stateLabel: 'color:blue;'
};

/**
* Async middleware to support asynchronous actions
*/
export const async:Middleware = (store: any) => (next: NextMiddleware) => {
  return (action: ReduxAction) => typeof action === 'function' ? action(store.dispatch) : next(action);
};

/**
* Logging middleware to log all dispatches and updates
*/
export const logger:Middleware = (store: any) => (next: NextMiddleware) => {
  return (action: ReduxAction) => {
    const result = next(action);
    console.log(`%c ${action.type}:`, styles.actionType, action);
    console.log('%c next state', styles.stateLabel, store.getState());
    return result;
  };
};

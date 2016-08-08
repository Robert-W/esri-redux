// @flow
const styles = {
  actionType: 'font-weight:bold;font-size:1.1em',
  stateLabel: 'color:blue;'
};

/**
* Async middleware to support asynchronous actions
*/
export const asyncActions:Middleware = (api: MiddlewareAPI) => (next: Dispatch) => {
  return (action: Action | AsyncAction) => typeof action === 'function' ? action(api.dispatch) : next(action);
};

/**
* Logging middleware to log all dispatches and updates
*/
export const logger:Middleware = (api: MiddlewareAPI) => (next: Dispatch) => {
  return (action: Action) => {
    const result = next(action);
    console.log(`%c ${action.type}:`, styles.actionType, action);
    console.log('%c next state', styles.stateLabel, api.getState());
    return result;
  };
};

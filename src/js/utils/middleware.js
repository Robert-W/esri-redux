const styles = {
  actionType: 'font-weight:bold;font-size:1.1em',
  stateLabel: 'color:blue;'
};

/**
* Async middleware to support asynchronous actions
*/
export const asyncActions = (api) => (next) => {
  return (action) => typeof action === 'function' ? action(api.dispatch) : next(action);
};

/**
* Logging middleware to log all dispatches and updates
*/
export const logger = (api) => (next) => {
  return (action) => {
    const result = next(action);
    console.log(`%c ${action.type}:`, styles.actionType, action);
    console.log('%c next state', styles.stateLabel, api.getState());
    return result;
  };
};

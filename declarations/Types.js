/*eslint-disable */
declare type ReduxAction = {
  type: string,
  data?: any
};

declare type AppState = {
  viewReady: bool
};

declare type EsriView = {} | {
  goTo: Function
};

/*eslint-disable */
declare type ReduxAction = {
  type: string,
  data?: any
};

declare type AppState = {
  locateModalVisible: bool,
  shareModalVisible: bool,
  viewReady: bool
};

declare type EsriView = Object | {
  goTo: Function,
  zoom: number
};

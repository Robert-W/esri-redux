/*eslint-disable */

// JavaScript Types
declare function requestAnimationFrame(callback: Function, timeout?: number): void;

// My App Types
declare type AppState = {
  locateModalVisible: bool,
  shareModalVisible: bool,
  viewReady: bool
};

// Redux Types
declare type ReduxAction = {
  type: string,
  data?: any
};

// Action Arguments
declare type ModalActionArgs = {
  visible: bool
};

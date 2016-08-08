/*eslint-disable */

// JavaScript Types
declare function requestAnimationFrame(callback: Function, timeout?: number): void;

// App specific types
declare type AppState = {
  locateModalVisible: bool,
  shareModalVisible: bool,
  itemInfo: Object,
  viewReady: bool
};

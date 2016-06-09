/*eslint-disable */

// JavaScript Types
declare function requestAnimationFrame(callback: Function, timeout?: number): void;

// Redux Types
declare type ReduxAction = {
  type: string,
  data?: any
};

// Async Redux Action
declare type ReduxAsyncAction = {};

// Redux Middleware
declare function Middleware (store: any):NextMiddleware;
declare function NextMiddleware (next: Function): ActionCreator;
declare function ActionCreator (action: ReduxAction): NextMiddleware;

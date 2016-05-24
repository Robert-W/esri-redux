/* @flow */
import {VIEW_READY} from 'js/constants/actionTypes';

export function viewCreated (): ReduxAction {
  return { type: VIEW_READY };
}

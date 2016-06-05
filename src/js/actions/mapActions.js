/* @flow */
import { VIEW_READY, SHOW_SHARE, SHOW_LOCATE } from 'js/constants/actionTypes';

export function viewCreated (): ReduxAction {
  return { type: VIEW_READY };
}

export function toggleShareModal (data: ModalActionArgs): ReduxAction {
  return { type: SHOW_SHARE, data };
}

export function toggleLocateModal (data: ModalActionArgs): ReduxAction {
  return { type: SHOW_LOCATE, data };
}

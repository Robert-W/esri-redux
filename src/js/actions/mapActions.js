/* @flow */
import { VIEW_READY, TOGGLE_SHARE, TOGGLE_LOCATE } from 'js/constants/actionTypes';

type ModalActionArgs = {
  visible: bool
}

export function viewCreated (): ReduxAction {
  return { type: VIEW_READY };
}

export function toggleShareModal (data: ModalActionArgs): ReduxAction {
  return { type: TOGGLE_SHARE, data };
}

export function toggleLocateModal (data: ModalActionArgs): ReduxAction {
  return { type: TOGGLE_LOCATE, data };
}

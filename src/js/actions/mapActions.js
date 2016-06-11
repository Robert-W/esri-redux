/* @flow */
import { VIEW_READY, TOGGLE_SHARE, TOGGLE_LOCATE, FETCH_ITEM_INFO } from 'js/constants/actionTypes';
import api from 'js/utils/api';

// Types
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

/**
* Example Async Action
*/
export function getItemInfo (appid: string): ReduxAsyncAction {
  return (dispatch: Dispatch) => {
    api.getItemInfo(appid).then((response) => {
      dispatch({ type: FETCH_ITEM_INFO, data: response.data });
    });
  };
}

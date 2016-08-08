// @flow
import { VIEW_READY, TOGGLE_SHARE, TOGGLE_LOCATE, FETCH_ITEM_INFO } from 'js/constants/actionTypes';
import api from 'js/utils/api';

// Types
type ModalActionArgs = {
  visible: bool
}

export function viewCreated (): Action {
  return { type: VIEW_READY };
}

export function toggleShareModal (data: ModalActionArgs): Action {
  return { type: TOGGLE_SHARE, data };
}

export function toggleLocateModal (data: ModalActionArgs): Action {
  return { type: TOGGLE_LOCATE, data };
}

/**
* Example Async Action
*/
export function getItemInfo (appid: string): AsyncAction {
  return (dispatch: BaseDispatch) => {
    api.getItemInfo(appid).then((response:{[key:string]: Object}) => {
      dispatch({ type: FETCH_ITEM_INFO, data: response.data });
    });
  };
}

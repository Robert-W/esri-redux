import { VIEW_READY, TOGGLE_SHARE, TOGGLE_LOCATE, FETCH_ITEM_INFO } from 'js/constants/actionTypes';
import api from 'js/utils/api';

export function viewCreated () {
  return { type: VIEW_READY };
}

export function toggleShareModal (data) {
  return { type: TOGGLE_SHARE, data };
}

export function toggleLocateModal (data) {
  return { type: TOGGLE_LOCATE, data };
}

/**
* Example Async Action
*/
export function getItemInfo (appid) {
  return dispatch => {
    api.getItemInfo(appid).then(response => {
      dispatch({ type: FETCH_ITEM_INFO, data: response.data });
    });
  };
}

import api from 'js/utils/api';
import {
  FETCH_ITEM_INFO,
  TOGGLE_LOCATE,
  TOGGLE_SHARE,
  VIEW_READY
} from 'js/constants/actionTypes';

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

import api from 'js/utils/api';
import {
  FETCH_ITEM_INFO,
  TOGGLE_LOCATE,
  TOGGLE_SHARE,
  VIEW_READY,
  EARTHQUAKE_FILTER_UPDATED,
  WATER_FILTER_UPDATED
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

export function earthquakeFilterUpdated (data) {
  return {type: EARTHQUAKE_FILTER_UPDATED, data: data.checked};
}

export function waterFilterUpdated (data) {
  return {type: WATER_FILTER_UPDATED, data: data.checked};
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

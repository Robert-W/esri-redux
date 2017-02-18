import { VIEW_READY, TOGGLE_SHARE, TOGGLE_LOCATE, FETCH_ITEM_INFO } from 'js/constants/actionTypes';
import {initialState} from 'js/config';

export function viewCreated (state = initialState.viewReady, action) {
  return action.type !== VIEW_READY ? state : true;
}

export function toggleShareModal (state = initialState.shareModalVisible, action) {
  const {type, data} = action;
  return type !== TOGGLE_SHARE ? state : (
    data.visible
  );
}

export function toggleLocateModal (state = initialState.locateModalVisible, action) {
  const {type, data} = action;
  return type !== TOGGLE_LOCATE ? state : (
    data.visible
  );
}

/**
* Reducer for the async action
*/
export function getItemInfo (state = initialState.itemInfo, action) {
  const {type, data} = action;
  return type !== FETCH_ITEM_INFO ? state : data;
}

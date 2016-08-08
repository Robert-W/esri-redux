// @flow
import { VIEW_READY, TOGGLE_SHARE, TOGGLE_LOCATE, FETCH_ITEM_INFO } from 'js/constants/actionTypes';
import {initialState} from 'js/config';

export function viewCreated (state:State = initialState.viewReady, action:Action):State {
  return action.type !== VIEW_READY ? state : true;
}

export function toggleShareModal (state:State = initialState.shareModalVisible, action:Action):State {
  const {type, data} = action;
  return type !== TOGGLE_SHARE ? state : (
    data.visible
  );
}

export function toggleLocateModal (state:State = initialState.locateModalVisible, action:Action):State {
  const {type, data} = action;
  return type !== TOGGLE_LOCATE ? state : (
    data.visible
  );
}

/**
* Reducer for the async action
*/
export function getItemInfo (state:State = initialState.itemInfo, action:AsyncAction):State {
  const {type, data} = action;
  return type !== FETCH_ITEM_INFO ? state : data;
}

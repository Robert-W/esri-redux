import { INITIAL_STATE } from 'js/config';

import {
  FETCH_ITEM_INFO,
  TOGGLE_LOCATE,
  TOGGLE_SHARE,
  VIEW_READY,
  EARTHQUAKE_FILTER_UPDATED,
  WATER_FILTER_UPDATED
} from 'js/constants/actionTypes';

export function viewCreated (state = INITIAL_STATE.viewReady, action) {
  return action.type !== VIEW_READY ? state : true;
}

export function toggleShareModal (state = INITIAL_STATE.shareModalVisible, action) {
  const {type, data} = action;
  return type !== TOGGLE_SHARE ? state : (
    data.visible
  );
}

export function toggleLocateModal (state = INITIAL_STATE.locateModalVisible, action) {
  const {type, data} = action;
  return type !== TOGGLE_LOCATE ? state : (
    data.visible
  );
}

/**
* Reducer for the async action
*/
export function getItemInfo (state = INITIAL_STATE.itemInfo, action) {
  const {type, data} = action;
  return type !== FETCH_ITEM_INFO ? state : data;
}

export function setEarthquakeViewFilters (state = INITIAL_STATE.earthquakeFilters, action) {
  const {type, data} = action;
  return type !== EARTHQUAKE_FILTER_UPDATED ? state : data;
}

export function setDrinkingWaterViewFilters (state = INITIAL_STATE.drinkingWaterFilters, action) {
  const {type, data} = action;
  return type !== WATER_FILTER_UPDATED ? state : data;
}



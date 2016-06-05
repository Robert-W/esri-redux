import { VIEW_READY, SHOW_SHARE, SHOW_LOCATE } from 'js/constants/actionTypes';

export function viewCreated (state = false, action) {
  return action.type !== VIEW_READY ? state : true;
}

export function toggleLocateModal (state = false, action) {
  const {type, data} = action;
  return type !== SHOW_LOCATE ? state : (
    data.visible
  );
}

export function toggleShareModal (state = false, action) {
  const {type, data} = action;
  return type !== SHOW_SHARE ? state : (
    data.visible
  );
}

import { VIEW_READY, SHOW_SHARE, SHOW_LOCATE } from 'js/constants/actionTypes';

export function viewCreated (state = false, action) {
  switch (action.type) {
    case VIEW_READY:
      return true;
    default:
      return state;
  }
}

export function toggleLocateModal (state = false, action) {
  const {type, data} = action;
  switch (type) {
    case SHOW_LOCATE:
      return data.visible;
    default:
      return state;
  }
}

export function toggleShareModal (state = false, action) {
  const {type, data} = action;
  switch (type) {
    case SHOW_SHARE:
      return data.visible;
    default:
      return state;
  }
}

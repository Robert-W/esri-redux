import {VIEW_READY} from 'js/constants/actionTypes';

export function viewCreated (state = false, action) {
  switch (action.type) {
    case VIEW_READY:
      return true;
    default:
      return state;
  }
}

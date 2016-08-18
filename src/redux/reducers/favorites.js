const ADD = 'shedgewool/favorites/ADD';
const REMOVE = 'shedgewool/favorites/REMOVE';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        [action.id]: true,
      };
    case REMOVE:
      return {
        ...state,
        [action.id]: false,
      };
    default:
      return state;
  }
}

export function add(id) {
  return { type: ADD, id };
}

export function remove(id) {
  return { type: REMOVE, id };
}

export const LOAD = "shedgewool/schedule/LOAD";
export const LOAD_SUCCESS = "shedgewool/schedule/LOAD_SUCCESS";
export const LOAD_FAIL = "shedgewool/schedule/LOAD_FAIL";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.result,
        error: null,
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      return state;
  }
}

export function load() {
  return { type: LOAD };
}

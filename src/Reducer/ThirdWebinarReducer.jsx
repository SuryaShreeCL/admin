import { THIRD_YEAR_WEBINAR } from "../Redux/Action";

const defaultState = {
  loading: false,
  allWebinarList: null,
  webinarList: null,
  createStatus: null,
  updateStatus: null,
  deleteStatus: null,
};

export const thirdYearWebinarListReducer = (state = defaultState, action) => {
  switch (action.type) {
    case THIRD_YEAR_WEBINAR.LOADER:
      return { ...state, loading: true };
    case THIRD_YEAR_WEBINAR.GET_ALL_WEBINAR_LIST:
      return {
        ...state,
        loading: false,
        allWebinarList: action.payload,
      };
    case THIRD_YEAR_WEBINAR.GET_WEBINAR_BY_ID:
      return { ...state, loading: false, webinarList: action.payload };
    case THIRD_YEAR_WEBINAR.CREATE_WEBINAR:
      return { ...state, loading: false, createStatus: action.payload };
    case THIRD_YEAR_WEBINAR.UPDATE_WEBINAR:
      return { ...state, loading: false, updateStatus: action.payload };
    case THIRD_YEAR_WEBINAR.DELETE_WEBINAR_BY_ID:
      return { ...state, loading: false, deleteStatus: action.payload };
    case THIRD_YEAR_WEBINAR.CLEAR_DATA:
      return {};
    default:
      return state;
  }
};

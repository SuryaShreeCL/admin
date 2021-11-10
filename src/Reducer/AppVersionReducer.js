import { APPVERSION } from '../Redux/Action';

export const getAppVersionReducer = (state = { version: [] }, action) => {
  switch (action.type) {
    case APPVERSION.REQUEST:
      return { loading: true, version: [] };
    case APPVERSION.SUCCESS:
      return {
        loading: false,
        version: action.payload,
      };
    case APPVERSION.FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const updateAppVersionReducer = (state = { details: [] }, action) => {
  switch (action.type) {
    case APPVERSION.CREATE_REQUEST:
      return { loading: true, details: [] };
    case APPVERSION.CREATE_SUCCESS:
      return {
        loading: false,
        details: action.payload,
      };
    case APPVERSION.CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

import { TEST } from '../Redux/Action';

export const testListReducer = (state = { tests: [] }, action) => {
  switch (action.type) {
    case TEST.LIST_REQUEST:
      return { loading: true, tests: [] };
    case TEST.LIST_SUCCESS:
      return {
        loading: false,
        tests: action.payload,
      };
    case TEST.LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const testDetailsReducer = (state = { test: [] }, action) => {
  switch (action.type) {
    case TEST.DETAILS_REQUEST:
      return { ...state, loading: true };
    case TEST.DETAILS_SUCCESS:
      return { loading: false, test: action.payload };
    case TEST.DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const testDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TEST.DELETE_REQUEST:
      return { loading: true };
    case TEST.DELETE_SUCCESS:
      return { loading: false, success: true };
    case TEST.DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const testCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TEST.CREATE_REQUEST:
      return { loading: true };
    case TEST.CREATE_SUCCESS:
      return { loading: false, success: true, test: action.payload };
    case TEST.CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TEST.CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const scheduleTestReducer = (state = {}, action) => {
  switch (action.type) {
    case TEST.SCHEDULE_REQUEST:
      return { scheduling: true };
    case TEST.SCHEDULE_SUCCESS:
      return { scheduling: false, success: true, test: action.payload };
    case TEST.SCHEDULE_FAIL:
      return { scheduling: false, error: action.payload };
    case TEST.SCHEDULE_RESET:
      return {};
    default:
      return state;
  }
};

export const questionSetUploadReducer = (state = {}, action) => {
  switch (action.type) {
    case TEST.QUESTION_SET_UPLOAD_REQUEST:
      return { uploading: true };
    case TEST.QUESTION_SET_UPLOAD_SUCCESS:
      return { uploading: false, success: true, test: action.payload };
    case TEST.QUESTION_SET_UPLOAD_FAIL:
      return { uploading: false, error: action.payload };
    case TEST.QUESTION_SET_UPLOAD_RESET:
      return {};
    default:
      return state;
  }
};

export const testUpdateReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case TEST.UPDATE_REQUEST:
      return { loading: true };
    case TEST.UPDATE_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case TEST.UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TEST.UPDATE_RESET:
      return { test: {} };
    default:
      return state;
  }
};

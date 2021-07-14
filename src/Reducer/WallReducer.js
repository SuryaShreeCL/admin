import { WALL } from '../Redux/Action';

export const wallPostListReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case WALL.LIST_REQUEST:
      return { loading: true, posts: [] };
    case WALL.LIST_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
      };
    case WALL.LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getWallCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case WALL.WALL_CATEGORIES_REQUEST:
      return { loading: true, posts: [] };
    case WALL.WALL_CATEGORIES_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      };
    case WALL.WALL_CATEGORIES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const wallPostDetailsReducer = (state = { post: [] }, action) => {
  switch (action.type) {
    case WALL.DETAILS_REQUEST:
      return { ...state, loading: true };
    case WALL.DETAILS_SUCCESS:
      return { loading: false, post: action.payload };
    case WALL.DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const wallPostDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case WALL.DELETE_REQUEST:
      return { loading: true };
    case WALL.DELETE_SUCCESS:
      return { loading: false, success: true };
    case WALL.DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const wallPostCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case WALL.CREATE_REQUEST:
      return { loading: true };
    case WALL.CREATE_SUCCESS:
      return { loading: false, success: true, WALL: action.payload };
    case WALL.CREATE_FAIL:
      return { loading: false, error: action.payload };
    case WALL.CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const wallPostUpdateReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case WALL.UPDATE_REQUEST:
      return { loading: true };
    case WALL.UPDATE_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case WALL.UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case WALL.UPDATE_RESET:
      return { post: {} };
    default:
      return state;
  }
};

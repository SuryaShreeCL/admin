import { HELPER } from "../Redux/Action";
const initialState = {
  tempState: {},
  popperState: {
    popperAnchorEl: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HELPER.storeItInState:
      return {
        ...state,
        tempState: action.payload,
      };
    case HELPER.setPopperAnchorEl:
      return {
        ...state,
        popperState: {
          popperAnchorEl: action.payload,
        },
      };
    default:
      break;
  }
  return state;
};

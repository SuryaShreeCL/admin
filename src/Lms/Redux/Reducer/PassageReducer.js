import { PASSAGE } from "../Action";

const initialState = {
  nameList: {},
  postAdd: [],
  postEdit: [],
};

const PassageReducer = (state = initialState, action) => {
  switch (action.type) {
    case PASSAGE.getAllPassages: {
      return {
        ...state,
        nameList: action.payload,
      };
    }
    case PASSAGE.postAdd: {
      return {
        ...state,
        postAdd: action.payload,
      };
    }

    case PASSAGE.postEdit: {
      return {
        ...state,
        postEdit: action.payload,
      };
    }
    default:
      break;
  }
  return state;
};

export default PassageReducer;

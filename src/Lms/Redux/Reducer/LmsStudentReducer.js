import { STUDENT } from "../Action";

const initialState = {
  taskTopic: [],
  products: [],
};

const LmsStudentReducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENT.getProducts: {
      return {
        ...state,
        products: action.payload,
      };
    }
    case STUDENT.getTaskTopic: {
      return {
        ...state,
        taskTopic: action.payload,
      };
    }
    default:
      break;
  }
  return state;
};

export default LmsStudentReducer;

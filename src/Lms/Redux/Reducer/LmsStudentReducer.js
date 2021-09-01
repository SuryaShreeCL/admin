import Student from "../../../Component/Student";
import { STUDENT } from "../Action";

const initialState = {
  taskTopic: [],
  products: [],
  lmsProducts: {},
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
    case STUDENT.getLmsProducts: {
      return {
        ...state,
        lmsProducts: action.payload,
      };
    }
    case STUDENT.studentLmsProduct: {
      return {
        ...state,
      };
    }
    default:
      break;
  }
  return state;
};

export default LmsStudentReducer;

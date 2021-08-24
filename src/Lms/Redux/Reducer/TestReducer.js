import { TEST } from '../Action';

const initialState = {
  filterData: [],
  testData: [],
  questionType: [],
};

const TestReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEST.getFilters: {
      return {
        ...state,
        filterData: action.payload,
      };
    }
    case TEST.getQuestionSet: {
      return {
        ...state,
        testData: action.payload,
      };
    }
    case TEST.getQuestionType: {
      return {
        ...state,
        questionType: action.payload,
      };
    }
    default:
      break;
  }
  return state;
};

export default TestReducer;

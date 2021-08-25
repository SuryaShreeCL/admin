import { TEST } from "../Action";

const initialState = {
  filterData: [],
  testData: [],
  questionType: [],
  testQuestionSet: [],
  topics: [],
  template: [],
};

const TestReducer = (state = initialState, action) => {
  // console.log(action);
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
    case TEST.createTestQuestionSet: {
      return {
        ...state,
        testQuestionSet: action.payload,
      };
    }
    case TEST.getTopicByCourse: {
      return {
        ...state,
        topics: action.payload,
      };
    }
    case TEST.getTemplate: {
      return {
        ...state,
        template: action.payload,
      };
    }
    default:
      break;
  }
  return state;
};

export default TestReducer;

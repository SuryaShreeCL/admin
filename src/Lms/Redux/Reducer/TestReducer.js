import { TEST } from '../Action';

const initialState = {
  filterData: [],
  testData: [],
  questionType: [],
  testQuestionSetResponse: [],
  testQuestionSet: [],
  topics: [],
  template: [],
  subjects: [],
  editData: null,
  previewData: null,
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
        testQuestionSetResponse: action.payload,
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
    case TEST.getSubjectsByCourse: {
      return {
        ...state,
        subjects: action.payload,
      };
    }
    case TEST.getTestQuestionSet: {
      return {
        ...state,
        testQuestionSet: action.payload,
      };
    }
    case TEST.getQuestions: {
      return {
        ...state,
        editData: action.payload,
      };
    }
    case TEST.cleanEditData: {
      return {
        ...state,
        editData: null,
      };
    }
    case TEST.previewTestData: {
      return {
        ...state,
        previewData: action.payload,
      };
    }

    default:
      break;
  }
  return state;
};

export default TestReducer;

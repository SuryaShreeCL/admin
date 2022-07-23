import { TEST } from "../Action";

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
  topicList: null,
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
    case TEST.aegetFilters: {
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
    case TEST.aegetQuestionSet: {
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
    case TEST.aegetQuestionType: {
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
    case TEST.aecreateTestQuestionSet: {
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
    case TEST.aegetTopicByCourse: {
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
    case TEST.aegetTemplate: {
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
    case TEST.aegetSubjectsByCourse: {
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
    case TEST.aegetTestQuestionSet: {
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
    case TEST.aegetQuestions: {
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
    case TEST.aecleanEditData: {
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
    case TEST.aepreviewTestData: {
      return {
        ...state,
        previewData: action.payload,
      };
    }
    case TEST.getTopicListByConceptId: {
      return {
        ...state,
        topicList: action.payload,
      };
    }

    default:
      break;
  }
  return state;
};

export default TestReducer;

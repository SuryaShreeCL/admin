import { STUDENT } from "../Action";

const initialState = {
  taskTopic: [],
  products: [],
  lmsProducts: {},
  strengthWeakness: null,
  studyPlan: null,
  calibrationTest: null,
  topicTest: null,
  topicTestReport: null,
  studentProducts: {},
  strengthAndWeakness: null,
  calibrationTestReport: null,
  topics: null,
  topicList: null,
  topicReport: null,
  loading: false,
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
        loading: action.loading || false,
      };
    }
    case STUDENT.getLmsProducts: {
      return {
        ...state,
        lmsProducts: action.payload,
      };
    }
    case STUDENT.strengthWeaknessExport: {
      return {
        ...state,
        strengthWeakness: action.payload,
      };
    }
    case STUDENT.studyPlanExport: {
      return {
        ...state,
        studyPlan: action.payload,
      };
    }
    case STUDENT.calibrationTestExport: {
      return {
        ...state,
        calibrationTest: action.payload,
      };
    }
    case STUDENT.topicTestExport: {
      return {
        ...state,
        topicTest: action.payload,
      };
    }
    case STUDENT.topicTestReportExport: {
      return {
        ...state,
        topicTestReport: action.payload,
      };
    }
    case STUDENT.studentLmsProduct: {
      return {
        ...state,
      };
    }
    case STUDENT.getStudentProducts: {
      return {
        ...state,
        studentProducts: action.payload,
      };
    }
    case STUDENT.getStrengthAndWeakness: {
      return {
        ...state,
        strengthAndWeakness: action.payload,
        loading: action.loading || false,
      };
    }
    case STUDENT.getCalibrationTestReport: {
      return {
        ...state,
        calibrationTestReport: action.payload,
        loading: action.loading || false,
      };
    }
    case STUDENT.getTopicName: {
      return {
        ...state,
        topics: action.payload,
        loading: action.loading || false,
      };
    }

    case STUDENT.postTopicTestList: {
      return {
        ...state,
        topicList: action.payload,
      };
    }

    case STUDENT.getTopicTestReport: {
      return {
        ...state,
        topicReport: action.payload,
      };
    }
    case STUDENT.clearFieldValue: {
      return {
        ...state,
        [action.fieldName]: null,
      };
    }
    case STUDENT.loader: {
      return {
        ...state,
        loading: true,
      };
    }

    default:
      break;
  }
  return state;
};

export default LmsStudentReducer;

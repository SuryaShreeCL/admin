import Student from "../../../Component/Student";
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
  studyPlanData: null,
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
    case STUDENT.getStudyPlan: {
      return {
        ...state,
        studyPlanData: action.payload,
      };
    }
    default:
      break;
  }
  return state;
};

export default LmsStudentReducer;

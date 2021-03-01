import { STUDENT } from "../Redux/Action";
const initialState = {
  StudentList: [],
  StudentsList:[],
  Answer:[],
  CareerIntertestSurvey:[],
  StudentFilterList:[],
  studentDocumentList : [],
  downloadedDocumentResponse : [],
  
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STUDENT.getStudent:
      return {
        ...state,
        StudentsList: action.StudentList,
      };
    case STUDENT.getStudentById:
      return {
        ...state,
        StudentList: action.StudentList,
      };
    case STUDENT.postStudent:
      return {
        ...state,
        StudentList: action.StudentList,
      };
    case STUDENT.studentCollegeInformation:
      return {
        ...state,
        StudentList: action.CollegeInfo,
      };
    case STUDENT.postQuestion:
      return {
        ...state,
        StudentList: action.QuestionList,
      };
    case STUDENT.studentFeedback:
      return {
        ...state,
        StudentList: action.StudentFeedback,
      };
    case STUDENT.startTestExecution:
      return {
        ...state,
        StudentList:action.TestExecution,
      };
    case STUDENT.careerInterestSurvey:
      return {
        ...state,
        CareerIntertestSurvey:action.CareerInterestSurvey,
      };
    case STUDENT.getAnswer:
      return {
        ...state,
        Answer:action.Answer,
      };
    case STUDENT.getStudentPaginate:
      return {
        ...state,
        StudentFilterList:action.StudentFilterResult,
      }
      case STUDENT.viewDocumet:
        return {
          ...state,
          studentDocumentList:action.studentDocumentList,
        }
        case STUDENT.downloadDocument:
        return {
          ...state,
          downloadedDocumentResponse:action.downloadedDocumentResponse,
        }
    default:
      break;
  }
  return state;
};
